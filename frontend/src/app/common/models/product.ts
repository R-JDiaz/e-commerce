export interface ProductListItem {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  category_name: string;
  image_url: string | null;
}

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
  images: {
    id: number;
    image_url: string;
  }[];
  created_at: string;
  updated_at: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  // Add other fields as needed for creation
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'soda' | 'food' | 'dessert';
  image: string;
  rating: number;
  inStock: boolean;
}