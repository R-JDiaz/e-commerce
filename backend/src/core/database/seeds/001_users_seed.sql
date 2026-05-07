INSERT INTO users (email, password_hash, first_name, last_name, phone, role)
VALUES
-- Admin users
('admin@example.com', 'pbkdf2$120000$c4f62dd9639979b858c66ad606518db4$7b8f4c2ef7fa0ea9c13d4b1d411907374457fa49d7b40a8f0bbdc94e386a721c5d4fdfe1f2c36f9f21a40dd5bfc79fc784730451c6bae2827e344f933387ff96', 'System', 'Admin', '09170000001', 'admin'),
('admin2@example.com', '$2b$10$hash_admin_2', 'Main', 'Admin', '09170000002', 'admin'),

-- Customers
('john.doe@example.com', '$2b$10$hash_user_1', 'Jay', 'Entiliso', '09170000003', 'customer'),
('jane.smith@example.com', '$2b$10$hash_user_2', 'Jane', 'Smith', '09170000004', 'customer'),
('pedro.reyes@example.com', '$2b$10$hash_user_3', 'Pedro', 'Reyes', '09170000005', 'customer'),
('ana.garcia@example.com', '$2b$10$hash_user_4', 'Ana', 'Garcia', '09170000006', 'customer'),
('mark.dizon@example.com', '$2b$10$hash_user_5', 'Mark', 'Dizon', '09170000007', 'customer'),
('luis.castro@example.com', '$2b$10$hash_user_6', 'Luis', 'Castro', '09170000008', 'customer'),
('sarah.lee@example.com', '$2b$10$hash_user_7', 'Sarah', 'Lee', '09170000009', 'customer');
