INSERT INTO users (email, password_hash, first_name, last_name, phone, role)
VALUES
-- Admin users
('admin@example.com', '$2b$10$hash_admin_1', 'System', 'Admin', '09170000001', 'admin'),
('admin2@example.com', '$2b$10$hash_admin_2', 'Main', 'Admin', '09170000002', 'admin'),

-- Customers
('john.doe@example.com', '$2b$10$hash_user_1', 'Jay', 'Entiliso', '09170000003', 'customer'),
('jane.smith@example.com', '$2b$10$hash_user_2', 'Jane', 'Smith', '09170000004', 'customer'),
('pedro.reyes@example.com', '$2b$10$hash_user_3', 'Pedro', 'Reyes', '09170000005', 'customer'),
('ana.garcia@example.com', '$2b$10$hash_user_4', 'Ana', 'Garcia', '09170000006', 'customer'),
('mark.dizon@example.com', '$2b$10$hash_user_5', 'Mark', 'Dizon', '09170000007', 'customer'),
('luis.castro@example.com', '$2b$10$hash_user_6', 'Luis', 'Castro', '09170000008', 'customer'),
('sarah.lee@example.com', '$2b$10$hash_user_7', 'Sarah', 'Lee', '09170000009', 'customer');
