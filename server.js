const express = require('express');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

const payments = new Map();

app.use(express.json());
app.use(morgan('dev'));

function validatePaymentRequest(body) {
  const errors = [];
  if (typeof body.amount !== 'number' || Number.isNaN(body.amount) || body.amount <= 0) {
    errors.push('amount must be a positive number');
  }
  if (typeof body.currency !== 'string' || body.currency.trim().length !== 3) {
    errors.push('currency must be a 3-letter code');
  }
  if (typeof body.method !== 'string' || body.method.trim().length === 0) {
    errors.push('method is required');
  }
  return errors;
}

app.post('/api/payments', (req, res) => {
  const errors = validatePaymentRequest(req.body || {});
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const paymentId = uuidv4();
  const clientSecret = uuidv4();
  const payment = {
    id: paymentId,
    status: 'pending',
    amount: req.body.amount,
    currency: req.body.currency.toUpperCase(),
    method: req.body.method,
    clientSecret,
    createdAt: new Date().toISOString(),
    metadata: req.body.metadata || {},
  };

  payments.set(paymentId, payment);

  return res.status(201).json({
    paymentId,
    clientSecret,
    status: payment.status,
    createdAt: payment.createdAt,
  });
});

app.get('/api/payments/:id', (req, res) => {
  const payment = payments.get(req.params.id);
  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }
  return res.json(payment);
});

app.post('/api/payments/:id/confirm', (req, res) => {
  const payment = payments.get(req.params.id);
  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  if (payment.status !== 'pending' && payment.status !== 'requires_action') {
    return res.status(409).json({ error: `Cannot confirm a payment in ${payment.status} state` });
  }

  payment.status = 'processing';
  payment.confirmedAt = new Date().toISOString();
  payment.status = 'succeeded';
  payment.completedAt = new Date().toISOString();
  payments.set(payment.id, payment);

  return res.json({
    paymentId: payment.id,
    status: payment.status,
    confirmedAt: payment.confirmedAt,
    completedAt: payment.completedAt,
  });
});

app.post('/api/payments/webhook', (req, res) => {
  const { paymentId, status, providerReference } = req.body || {};
  const payment = paymentId ? payments.get(paymentId) : null;
  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  const allowedStatuses = new Set(['succeeded', 'failed', 'requires_action', 'canceled']);
  if (status && !allowedStatuses.has(status)) {
    return res.status(400).json({ error: 'Unsupported status value' });
  }

  if (status) {
    payment.status = status;
  }
  if (providerReference) {
    payment.providerReference = providerReference;
  }
  payment.updatedAt = new Date().toISOString();
  payments.set(payment.id, payment);

  return res.json({
    paymentId: payment.id,
    status: payment.status,
    providerReference: payment.providerReference,
    updatedAt: payment.updatedAt,
  });
});

app.use((req, res) => {
  return res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, _next) => {
  console.error(err);
  return res.status(500).json({ error: 'Unexpected server error' });
});

app.listen(PORT, () => {
  console.log(`Payment API running on port ${PORT}`);
});
