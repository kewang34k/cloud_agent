const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { authenticateToken } = require('../middleware/auth');
const { run, get, all } = require('../database/db');

const router = express.Router();

// Create payment intent for one-time purchase
router.post('/create-payment-intent', authenticateToken, async (req, res) => {
  try {
    const { amount, currency = 'usd', description } = req.body;
    const userId = req.user.userId;

    if (!amount || amount < 50) {
      return res.status(400).json({ error: 'Invalid amount (minimum $0.50)' });
    }

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        userId: userId.toString(),
        description: description || 'Snake Game Purchase'
      }
    });

    // Record transaction in database
    await run(
      `INSERT INTO transactions (user_id, stripe_payment_intent_id, amount, currency, status, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, paymentIntent.id, amount, currency, 'pending', description]
    );

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Create subscription checkout session
router.post('/create-subscription', authenticateToken, async (req, res) => {
  try {
    const { priceId, planType } = req.body;
    const userId = req.user.userId;

    if (!priceId || !planType) {
      return res.status(400).json({ error: 'Price ID and plan type are required' });
    }

    // Get user email
    const user = await get('SELECT email FROM users WHERE id = ?', [userId]);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create or get Stripe customer
    let customer;
    const existingSubscription = await get(
      'SELECT stripe_customer_id FROM subscriptions WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [userId]
    );

    if (existingSubscription && existingSubscription.stripe_customer_id) {
      customer = await stripe.customers.retrieve(existingSubscription.stripe_customer_id);
    } else {
      customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: userId.toString()
        }
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/cancel`,
      // IMPORTANT: subscription webhooks include the Subscription object, not the Checkout Session.
      // Metadata must be set on the subscription via subscription_data.metadata.
      subscription_data: {
        metadata: {
          userId: userId.toString(),
          planType
        }
      },
      metadata: {
        userId: userId.toString(),
        planType
      }
    });

    res.json({
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    console.error('Subscription creation error:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

// Stripe webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        await run(
          'UPDATE transactions SET status = ? WHERE stripe_payment_intent_id = ?',
          ['succeeded', paymentIntent.id]
        );
        break;

      case 'payment_intent.payment_failed':
        const failedIntent = event.data.object;
        await run(
          'UPDATE transactions SET status = ? WHERE stripe_payment_intent_id = ?',
          ['failed', failedIntent.id]
        );
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        const customerId = subscription.customer;
        const subscriptionMetadata = subscription.metadata || {};
        let userId = subscriptionMetadata.userId;
        let planType = subscriptionMetadata.planType;

        // Fallback: we also store userId on the Stripe customer.
        // If subscription metadata is missing (older sessions), backfill it.
        if (!userId && customerId) {
          const customer = await stripe.customers.retrieve(customerId);
          userId = customer?.metadata?.userId;
        }

        if (!planType) {
          planType = 'premium';
        }

        if (!userId) {
          throw new Error(`Missing userId metadata for subscription ${subscription.id}`);
        }

        // Keep Stripe objects consistent for future webhook events.
        if (
          subscriptionMetadata.userId !== userId ||
          subscriptionMetadata.planType !== planType
        ) {
          await stripe.subscriptions.update(subscription.id, {
            metadata: {
              ...subscriptionMetadata,
              userId: userId.toString(),
              planType
            }
          });
        }

        await run(
          `INSERT INTO subscriptions
           (user_id, stripe_subscription_id, stripe_customer_id, plan_type, status, current_period_start, current_period_end)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(stripe_subscription_id) DO UPDATE SET
           status = excluded.status,
           current_period_start = excluded.current_period_start,
           current_period_end = excluded.current_period_end,
           updated_at = CURRENT_TIMESTAMP`,
          [
            Number.parseInt(userId, 10),
            subscription.id,
            customerId,
            planType,
            subscription.status,
            new Date(subscription.current_period_start * 1000).toISOString(),
            new Date(subscription.current_period_end * 1000).toISOString()
          ]
        );
        break;

      case 'customer.subscription.deleted':
        const deletedSub = event.data.object;
        await run(
          'UPDATE subscriptions SET status = ? WHERE stripe_subscription_id = ?',
          ['canceled', deletedSub.id]
        );
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Get user's subscription status
router.get('/subscription-status', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const subscription = await get(
      `SELECT * FROM subscriptions
       WHERE user_id = ? AND status = 'active'
       ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );

    res.json({
      hasActiveSubscription: !!subscription,
      subscription: subscription || null
    });
  } catch (error) {
    console.error('Subscription status error:', error);
    res.status(500).json({ error: 'Failed to get subscription status' });
  }
});

// Get user's transaction history
router.get('/transactions', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const transactions = await all(
      `SELECT id, amount, currency, status, description, created_at
       FROM transactions
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json({ transactions });
  } catch (error) {
    console.error('Transaction history error:', error);
    res.status(500).json({ error: 'Failed to get transaction history' });
  }
});

// Cancel subscription
router.post('/cancel-subscription', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const subscription = await get(
      `SELECT stripe_subscription_id FROM subscriptions
       WHERE user_id = ? AND status = 'active'
       ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );

    if (!subscription) {
      return res.status(404).json({ error: 'No active subscription found' });
    }

    // Cancel subscription in Stripe
    await stripe.subscriptions.cancel(subscription.stripe_subscription_id);

    res.json({ message: 'Subscription canceled successfully' });
  } catch (error) {
    console.error('Subscription cancellation error:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

module.exports = router;
