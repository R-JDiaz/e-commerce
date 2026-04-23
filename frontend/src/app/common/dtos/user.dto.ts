export interface UserSummaryDTO {
  id: number | string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface UserDetailDTO extends UserSummaryDTO {
  role?: 'customer' | 'admin';
  password_hash?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UpdateUserRequestDTO {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  role?: 'customer' | 'admin';
}

