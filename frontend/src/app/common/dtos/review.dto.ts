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

export interface TopReview extends OrderReviewDTO {
  first_name: string;
  last_name: string;
}

