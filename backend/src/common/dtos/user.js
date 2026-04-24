// Safe (public)
export const publicUserDTO = (user) => ({
  id: user.id,
  email: user.email,
  first_name: user.first_name,
  last_name: user.last_name,
  phone: user.phone ?? null,
  address_line: user.address_line ?? null,
  city: user.city ?? null,
  state: user.state ?? null,
  postal_code: user.postal_code ?? null,
  role: user.role ?? "customer"
});

// Full (admin/internal)
export const fullUserDTO = (user) => ({
  id: user.id,
  email: user.email,
  first_name: user.first_name,
  last_name: user.last_name,
  phone: user.phone ?? null,
  password_hash: user.password_hash,
  role: user.role,
  address_line: user.address_line ?? null,
  city: user.city ?? null,
  state: user.state ?? null,
  postal_code: user.postal_code ?? null,
  created_at: user.created_at,
  updated_at: user.updated_at
});
