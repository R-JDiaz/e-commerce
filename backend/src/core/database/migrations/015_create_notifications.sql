CREATE TABLE IF NOT EXISTS notifications (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

  user_id BIGINT UNSIGNED NULL, -- 👈 allow NULL for admin/global

  target_role ENUM('customer', 'admin') NOT NULL DEFAULT 'customer',

  type ENUM('order', 'payment', 'system') NOT NULL DEFAULT 'system',

  message TEXT NOT NULL,

  is_read BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- 🔗 Foreign Key (still valid, but now optional)
  CONSTRAINT fk_notifications_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  -- ⚡ Indexes
  INDEX idx_user_id (user_id),
  INDEX idx_target_role (target_role),
  INDEX idx_is_read (is_read),
  INDEX idx_created_at (created_at)
);