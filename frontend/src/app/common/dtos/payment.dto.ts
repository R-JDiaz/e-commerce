export interface CheckoutPaymentRequestDTO {
  order_id: number | string;
  payment_method: 'cod' | 'online' | 'cash' | 'card' | 'gcash';
  cash?: number;
}

export interface PaymentDetailDTO {
  id: number | string;
  order_id: number | string;
  amount: number;
  payment_method: string;
  status: string;
  transaction_id: string;
  created_at: string;
}

export interface PaymentOrderDetailDTO {
  id: number | string;
  user_id: number | string;
  total_amount: number;
  status: string;
  shipping_addr: string;
  created_at: string;
}

export interface PaymentCheckoutResponseDTO {
  payment: PaymentDetailDTO;
  order: PaymentOrderDetailDTO;
}

