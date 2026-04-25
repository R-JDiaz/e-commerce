export interface CartProductItemDTO {
  id: number | string;
  product_id?: number | string;
  name: string;
  price: number;
  image_url: string | null;
  quantity: number;
  subtotal: number;
}

export interface CartDetailDTO {
  id: number | string;
  user_id: number | string;
  products: CartProductItemDTO[];
  total_items: number;
  total_price: number;
}

export interface AddCartItemRequestDTO {
  productId: number | string;
  quantity: number;
}

export interface UpdateCartItemRequestDTO extends AddCartItemRequestDTO {}

export interface RemoveCartItemRequestDTO {
  productId: number | string;
}
