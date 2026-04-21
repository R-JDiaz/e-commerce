export const paymentDTO = (payment) => ({
  id: payment.id,
  order_id: payment.order_id,
  amount: payment.amount,
  payment_method: payment.payment_method,
  status: payment.status,
  transaction_id: payment.transaction_id,
  created_at: payment.created_at
});