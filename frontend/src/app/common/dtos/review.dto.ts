export interface CreateOrderReviewDTO {
  order_id: number;
  rating: number;
  comment: string;
}

export interface OrderReviewDTO {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
}


