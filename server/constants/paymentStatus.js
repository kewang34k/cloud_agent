/**
 * Payment status constants
 */
const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
  REQUIRES_ACTION: 'requires_action',
  CANCELED: 'canceled'
};

/**
 * Get set of allowed status values for webhook updates
 */
function getAllowedWebhookStatuses() {
  return new Set([
    PAYMENT_STATUS.SUCCEEDED,
    PAYMENT_STATUS.FAILED,
    PAYMENT_STATUS.REQUIRES_ACTION,
    PAYMENT_STATUS.CANCELED
  ]);
}

/**
 * Check if status can be confirmed
 */
function canConfirm(status) {
  return status === PAYMENT_STATUS.PENDING || status === PAYMENT_STATUS.REQUIRES_ACTION;
}

module.exports = {
  PAYMENT_STATUS,
  getAllowedWebhookStatuses,
  canConfirm
};
