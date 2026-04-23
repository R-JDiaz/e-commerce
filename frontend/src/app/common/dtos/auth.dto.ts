export interface AuthUserDTO {
  id: number | string;
  email: string;
  first_name: string;
  last_name: string;
  role?: 'customer' | 'admin';
}

export interface AuthSessionDTO {
  user: AuthUserDTO;
  access_token: string;
  refresh_token: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterRequestDTO {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface RefreshRequestDTO {
  refresh_token: string;
}

