const { v4: uuidv4 } = require('uuid');
const { PAYMENT_STATUS, canConfirm } = require('../constants/paymentStatus');

/**
 * Service layer for payment operations
 */
class PaymentService {
  constructor() {
    this.payments = new Map();
  }

  /**
   * Create a new payment
   */
  createPayment(amount, currency, method, metadata = {}) {
    const paymentId = uuidv4();
    const clientSecret = uuidv4();

    const payment = {
      id: paymentId,
      status: PAYMENT_STATUS.PENDING,
      amount,
      currency: currency.toUpperCase(),
      method,
      clientSecret,
      createdAt: new Date().toISOString(),
      metadata
    };

    this.payments.set(paymentId, payment);

    return {
      paymentId,
      clientSecret,
      status: payment.status,
      createdAt: payment.createdAt
    };
  }

  /**
   * Get payment by ID
   */
  getPayment(paymentId) {
    return this.payments.get(paymentId);
  }

  /**
   * Confirm a payment
   */
  confirmPayment(paymentId) {
    const payment = this.payments.get(paymentId);

    if (!payment) {
      return { error: 'Payment not found', statusCode: 404 };
    }

    if (!canConfirm(payment.status)) {
      return {
        error: `Cannot confirm a payment in ${payment.status} state`,
        statusCode: 409
      };
    }

    // Update payment status directly to succeeded
    payment.status = PAYMENT_STATUS.SUCCEEDED;
    payment.confirmedAt = new Date().toISOString();
    payment.completedAt = new Date().toISOString();
    this.payments.set(payment.id, payment);

    return {
      paymentId: payment.id,
      status: payment.status,
      confirmedAt: payment.confirmedAt,
      completedAt: payment.completedAt
    };
  }

  /**
   * Update payment via webhook
   */
  updatePaymentViaWebhook(paymentId, status, providerReference) {
    const payment = this.payments.get(paymentId);

    if (!payment) {
      return { error: 'Payment not found', statusCode: 404 };
    }

    if (status) {
      payment.status = status;
    }
    if (providerReference) {
      payment.providerReference = providerReference;
    }
    payment.updatedAt = new Date().toISOString();
    this.payments.set(payment.id, payment);

    return {
      paymentId: payment.id,
      status: payment.status,
      providerReference: payment.providerReference,
      updatedAt: payment.updatedAt
    };
  }
}

module.exports = PaymentService;
