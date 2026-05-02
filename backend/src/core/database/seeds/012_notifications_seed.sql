INSERT INTO notifications (user_id, type, message, is_read)
VALUES
-- Admin notifications
(1, 'system', 'New order has been placed by John Doe', FALSE),
(1, 'system', 'Low stock alert: Product #12 is running low', TRUE),
(2, 'system', 'New user registered: Jane Smith', FALSE),

-- Customer notifications
(3, 'order', 'Your order #1001 has been placed successfully', TRUE),
(3, 'payment', 'Payment received for order #1001', TRUE),
(3, 'order', 'Your order #1001 has been shipped', FALSE),

(4, 'order', 'Your order #1002 has been placed successfully', TRUE),
(4, 'payment', 'Payment received for order #1002', FALSE),

(5, 'order', 'Your order #1003 has been placed successfully', TRUE),

(6, 'order', 'Your order #1004 has been delivered', FALSE),

(7, 'system', 'Welcome to our store!', TRUE),

(8, 'order', 'Your order #1005 is being processed', FALSE),

(9, 'payment', 'Payment failed for order #1006. Please retry.', FALSE);