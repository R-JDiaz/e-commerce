// Safe (public)
export const publicUserDTO = (user) => ({
  id: user.id,
  email: user.email,
  first_name: user.first_name,
  last_name: user.last_name
});

// Full (admin/internal)
export const fullUserDTO = (user) => ({
  id: user.id,
  email: user.email,
  first_name: user.first_name,
  last_name: user.last_name,
  password_hash: user.password_hash,
  role: user.role,
  created_at: user.created_at,
  updated_at: user.updated_at
});