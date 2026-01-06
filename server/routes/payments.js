const express = require('express');
const { validatePaymentRequest, validateWebhookStatus } = require('../middleware/validation');

/**
 * Create payment routes with dependency injection
 */
function createPaymentRoutes(paymentService) {
  const router = express.Router();

  /**
   * POST /api/payments - Create a new payment
   */
  router.post('/', validatePaymentRequest, (req, res) => {
    const { amount, currency, method, metadata } = req.body;
    const result = paymentService.createPayment(amount, currency, method, metadata);
    return res.status(201).json(result);
  });

  /**
   * GET /api/payments/:id - Get payment details
   */
  router.get('/:id', (req, res) => {
    const payment = paymentService.getPayment(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    return res.json(payment);
  });

  /**
   * POST /api/payments/:id/confirm - Confirm a payment
   */
  router.post('/:id/confirm', (req, res) => {
    const result = paymentService.confirmPayment(req.params.id);

    if (result.error) {
      return res.status(result.statusCode).json({ error: result.error });
    }

    return res.json(result);
  });

  /**
   * POST /api/payments/webhook - Handle webhook updates
   */
  router.post('/webhook', validateWebhookStatus, (req, res) => {
    const { paymentId, status, providerReference } = req.body || {};

    if (!paymentId) {
      return res.status(400).json({ error: 'paymentId is required' });
    }

    const result = paymentService.updatePaymentViaWebhook(paymentId, status, providerReference);

    if (result.error) {
      return res.status(result.statusCode).json({ error: result.error });
    }

    return res.json(result);
  });

  return router;
}

module.exports = createPaymentRoutes;
