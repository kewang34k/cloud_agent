const express = require('express');
const morgan = require('morgan');
const path = require('path');
const PaymentService = require('./services/PaymentService');
const createPaymentRoutes = require('./routes/payments');

/**
 * Create and configure Express application
 */
function createApp() {
  const app = express();
  const paymentService = new PaymentService();

  // Middleware
  app.use(express.json());
  app.use(morgan('dev'));

  // Serve static files from public directory
  app.use(express.static(path.join(__dirname, '../public')));

  // API routes
  app.use('/api/payments', createPaymentRoutes(paymentService));

  // 404 handler for API routes
  app.use('/api', (req, res) => {
    return res.status(404).json({ error: 'Route not found' });
  });

  // Error handler
  app.use((err, req, res, _next) => {
    console.error(err);
    return res.status(500).json({ error: 'Unexpected server error' });
  });

  return app;
}

module.exports = createApp;
