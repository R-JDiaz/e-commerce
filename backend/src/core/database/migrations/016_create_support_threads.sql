CREATE TABLE IF NOT EXISTS support_threads (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NULL,
  visitor_key VARCHAR(80) NULL,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NULL,
  status ENUM('open', 'closed') NOT NULL DEFAULT 'open',
  unread_count INT UNSIGNED NOT NULL DEFAULT 0,
  messages JSON NOT NULL,
  last_message_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_support_user (user_id),
  UNIQUE KEY unique_support_visitor (visitor_key)
);
