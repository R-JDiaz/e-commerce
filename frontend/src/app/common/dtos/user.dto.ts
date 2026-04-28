export interface UserSummaryDTO {
  id: number | string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string | null;
}

export interface UserDetailDTO extends UserSummaryDTO {
  role?: 'customer' | 'admin';
  password_hash?: string;
  address_line?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface UpdateUserRequestDTO {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  role?: 'customer' | 'admin';
  phone?: string | null;
  address_line?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
}
export interface UserCompleteDetailDTO extends UpdateUserRequestDTO{
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  role?: 'customer' | 'admin';
  phone?: string | null;
  address_line?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
}