import { Order, OrderItem } from "@common/services/managers/order/order";

export type OrderStatusDTO = 'pending' | 'accepted' | 'paid' | 'shipped' | 'completed' | 'cancelled' | 'refund';

export interface OrderSummaryDTO {
  id: number | string;
  user_id?: number | string;
  total_amount: number;
  status: OrderStatusDTO;
  payment_method?: string | null;
  payment_status?: string | null;
  created_at: string;
  items: OrderItem[];
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

export interface OrderReviewDTO {
  id: number,
  rating: number,
  comment: string,
  created_at: string
}

export interface OrderDetailDTO {
  id: number | string;
  user_id: number | string;
  total_amount: number;
  status: OrderStatusDTO;
  payment_method?: string | null;
  payment_status?: string | null;
  shipping_addr: string;
  items: OrderItemDTO[];
  review: OrderReviewDTO;
  created_at: string;
}

export interface CreateOrderRequestDTO {
  shipping_addr: string;
}

export interface UpdateOrderStatusRequestDTO {
  status: OrderStatusDTO;
}
