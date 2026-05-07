export interface ProductImageDTO {
  id: number;
  image_url: string;
}

export interface ProductListItemDTO {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  category_name: string;
  image_url: string | null;
}

export interface ProductCategoryDTO {
  id: number;
  name: string;
  slug: string;
}

export interface ProductDetailDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategoryDTO;
  images: ProductImageDTO[];
  created_at: string;
  updated_at: string;
}

export interface CreateProductRequestDTO {
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  image_url?: string | null;
}

export interface UpdateProductRequestDTO extends Partial<CreateProductRequestDTO> {}

