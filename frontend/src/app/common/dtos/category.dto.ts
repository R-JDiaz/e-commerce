export interface CategoryItemDTO {
  id: number;
  name: string;
  slug: string;
}

export interface CreateCategoryRequestDTO {
  name: string;
  slug: string;
}

export interface UpdateCategoryRequestDTO extends Partial<CreateCategoryRequestDTO> {}

