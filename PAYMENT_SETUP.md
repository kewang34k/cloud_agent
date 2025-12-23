# Snake Game - Payment Backend Setup Guide

This guide will help you set up the payment backend for the Snake game using Stripe integration.

## Architecture Overview

The payment system consists of:
- **Backend**: Node.js/Express server with Stripe integration
- **Database**: SQLite for user management and transaction tracking
- **Authentication**: JWT-based auth system
- **Payment Provider**: Stripe for processing payments and subscriptions

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Stripe account (sign up at https://stripe.com)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Create product and price IDs for your subscription plans:
   - Go to Products in Stripe Dashboard
   - Create a new product (e.g., "Snake Game Premium")
   - Add pricing (e.g., $2.99/month)
   - Copy the Price ID

### 3. Environment Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Stripe credentials:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Secret (IMPORTANT: Change this in production!)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_... # Your Stripe secret key
STRIPE_PUBLISHABLE_KEY=pk_test_... # Your Stripe publishable key
STRIPE_WEBHOOK_SECRET=whsec_... # Your webhook secret (see step 4)

# Stripe Price IDs
STRIPE_PREMIUM_MONTHLY_PRICE_ID=price_... # From Stripe Dashboard
STRIPE_PREMIUM_YEARLY_PRICE_ID=price_... # From Stripe Dashboard

# Client URL
CLIENT_URL=http://localhost:3000
```

### 4. Webhook Configuration

Stripe uses webhooks to notify your server about payment events.

**For Development (using Stripe CLI):**

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login to Stripe CLI:
```bash
stripe login
```

3. Forward webhooks to your local server:
```bash
stripe listen --forward-to localhost:3000/api/payment/webhook
```

4. Copy the webhook secret (whsec_...) to your `.env` file

**For Production:**

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/payment/webhook`
3. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the webhook signing secret to your `.env` file

### 5. Update Frontend Configuration

Edit `public/game.html` and update:
```javascript
const API_URL = 'http://localhost:3000/api'; // Update for production
const stripe = Stripe('pk_test_...'); // Add your publishable key
```

Update the price IDs in the `createSubscription` function:
```javascript
const priceId = planType === 'monthly' ?
    'price_monthly_id_here' : // Your actual monthly price ID
    'price_yearly_id_here';   // Your actual yearly price ID
```

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the PORT specified in `.env`)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Payment
- `POST /api/payment/create-payment-intent` - Create one-time payment
- `POST /api/payment/create-subscription` - Create subscription
- `POST /api/payment/webhook` - Stripe webhook handler
- `GET /api/payment/subscription-status` - Get subscription status
- `GET /api/payment/transactions` - Get transaction history
- `POST /api/payment/cancel-subscription` - Cancel subscription

### User
- `GET /api/user/profile` - Get user profile
- `POST /api/user/score` - Save game score
- `GET /api/user/scores` - Get score history
- `GET /api/user/leaderboard` - Get global leaderboard

## Database Schema

The SQLite database includes these tables:

### users
- id, username, email, password_hash, created_at, updated_at

### subscriptions
- id, user_id, stripe_subscription_id, stripe_customer_id, plan_type, status, current_period_start, current_period_end, created_at, updated_at

### transactions
- id, user_id, stripe_payment_intent_id, amount, currency, status, description, created_at

### scores
- id, user_id, score, game_mode, created_at

## Security Considerations

### Production Checklist

1. **Change JWT_SECRET**: Use a strong, random secret (minimum 32 characters)
2. **Use HTTPS**: Never use HTTP in production for payment processing
3. **Secure Environment Variables**: Never commit `.env` file to version control
4. **Rate Limiting**: Implement rate limiting for API endpoints
5. **Input Validation**: Validate all user inputs on the backend
6. **CORS Configuration**: Restrict CORS to your frontend domain only
7. **Database Security**: Use proper database permissions
8. **Stripe Keys**: Use live keys only in production, test keys in development

### Example Production CORS Configuration

Edit `server/index.js`:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com', // Your production domain
  credentials: true
}));
```

## Testing Payments

### Test Card Numbers (Stripe Test Mode)

- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

Use any future expiry date, any 3-digit CVC, and any ZIP code.

## Pricing Recommendations

### One-Time Purchase
- **Recommended**: $4.99 - $9.99
- Provides permanent access to premium features

### Monthly Subscription
- **Recommended**: $2.99 - $4.99/month
- Best for ongoing features and updates

### Yearly Subscription
- **Recommended**: $24.99 - $39.99/year (save 20-30% vs monthly)
- Encourage long-term commitment

## Premium Features Ideas

Consider offering these features to premium users:
- Ad-free experience
- Exclusive skins/themes
- Power-ups and special items
- Multiplayer modes
- Leaderboard badges
- Game statistics and analytics
- Cloud save synchronization
- Early access to new features

## Monitoring and Analytics

### Stripe Dashboard
Monitor payments, subscriptions, and customer data in your Stripe Dashboard.

### Database Queries
```sql
-- Total revenue
SELECT SUM(amount)/100.0 as total_revenue FROM transactions WHERE status = 'succeeded';

-- Active subscriptions
SELECT COUNT(*) as active_subs FROM subscriptions WHERE status = 'active';

-- User retention
SELECT COUNT(DISTINCT user_id) as users_with_scores FROM scores;
```

## Troubleshooting

### Webhook Not Working
- Verify webhook secret in `.env`
- Check Stripe CLI is running (development)
- Verify endpoint URL (production)
- Check server logs for errors

### Payment Intent Failed
- Verify Stripe secret key is correct
- Check amount is >= $0.50 (50 cents minimum)
- Ensure user is authenticated

### Database Errors
- Verify database directory exists: `mkdir -p server/data`
- Check file permissions
- Review SQL syntax in queries

## Support

For issues with:
- **Stripe Integration**: https://stripe.com/docs
- **Node.js/Express**: https://expressjs.com
- **SQLite**: https://www.sqlite.org/docs.html

## License

MIT License - Feel free to modify and use for your projects.
