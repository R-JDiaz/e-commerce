INSERT INTO notifications (target_role, type, message, is_read)
VALUES
('admin', 'system', 'New order has been placed by John Doe', FALSE),
('admin', 'system', 'Low stock alert: Product #12 is running low', TRUE),
('admin', 'system', 'New user registered: Jane Smith', FALSE);
