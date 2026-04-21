INSERT INTO users (email, password_hash, first_name, last_name, role)
VALUES
-- Admin users
('admin@example.com', '$2b$10$hash_admin_1', 'System', 'Admin', 'admin'),
('admin2@example.com', '$2b$10$hash_admin_2', 'Main', 'Admin', 'admin'),

-- Customers
('john.doe@example.com', '$2b$10$hash_user_1', 'John', 'Doe', 'customer'),
('jane.smith@example.com', '$2b$10$hash_user_2', 'Jane', 'Smith', 'customer'),
('pedro.reyes@example.com', '$2b$10$hash_user_3', 'Pedro', 'Reyes', 'customer'),
('ana.garcia@example.com', '$2b$10$hash_user_4', 'Ana', 'Garcia', 'customer'),
('mark.dizon@example.com', '$2b$10$hash_user_5', 'Mark', 'Dizon', 'customer'),
('luis.castro@example.com', '$2b$10$hash_user_6', 'Luis', 'Castro', 'customer'),
('sarah.lee@example.com', '$2b$10$hash_user_7', 'Sarah', 'Lee', 'customer');