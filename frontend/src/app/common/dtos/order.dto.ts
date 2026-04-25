export type OrderStatusDTO = 'pending' | 'accepted' | 'paid' | 'shipped' | 'completed' | 'cancelled';

export interface OrderSummaryDTO {
  id: number | string;
  user_id?: number | string;
  total_amount: number;
  status: OrderStatusDTO;
  created_at: string;
}

export interface OrderItemDTO {
  id: number | string;
  product: {
    id: number | string;
    name: string;
    price: number;
  };
  quantity: number;
  subtotal: number;
}

export interface OrderDetailDTO {
  id: number | string;
  user_id: number | string;
  total_amount: number;
  status: OrderStatusDTO;
  shipping_addr: string;
  items: OrderItemDTO[];
  created_at: string;
}

export interface CreateOrderRequestDTO {
  shipping_addr: string;
}

export interface UpdateOrderStatusRequestDTO {
  status: OrderStatusDTO;
}
