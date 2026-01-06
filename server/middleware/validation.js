const { getAllowedWebhookStatuses } = require('../constants/paymentStatus');

/**
 * Validate payment creation request
 */
function validatePaymentRequest(req, res, next) {
  const errors = [];
  const { amount, currency, method } = req.body || {};

  if (typeof amount !== 'number' || Number.isNaN(amount) || amount <= 0) {
    errors.push('amount must be a positive number');
  }
  if (typeof currency !== 'string' || currency.trim().length !== 3) {
    errors.push('currency must be a 3-letter code');
  }
  if (typeof method !== 'string' || method.trim().length === 0) {
    errors.push('method is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

/**
 * Validate webhook status
 */
function validateWebhookStatus(req, res, next) {
  const { status } = req.body || {};

  if (status) {
    const allowedStatuses = getAllowedWebhookStatuses();
    if (!allowedStatuses.has(status)) {
      return res.status(400).json({ error: 'Unsupported status value' });
    }
  }

  next();
}

module.exports = {
  validatePaymentRequest,
  validateWebhookStatus
};
