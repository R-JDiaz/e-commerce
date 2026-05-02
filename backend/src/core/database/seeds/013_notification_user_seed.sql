INSERT INTO notifications (user_id, target_role, type, message, is_read)
VALUES
(3, 'user', 'order', 'Your order #1001 has been placed successfully', TRUE),
(3, 'user', 'payment', 'Payment received for order #1001', TRUE),
(3, 'user', 'order', 'Your order #1001 has been shipped', FALSE),

(4, 'user', 'order', 'Your order #1002 has been placed successfully', TRUE),
(4, 'user', 'payment', 'Payment received for order #1002', FALSE),

(5, 'user', 'order', 'Your order #1003 has been placed successfully', TRUE),

(6, 'user', 'order', 'Your order #1004 has been delivered', FALSE),

(7, 'user', 'system', 'Welcome to our store!', TRUE),

(8, 'user', 'order', 'Your order #1005 is being processed', FALSE),

(9, 'user', 'payment', 'Payment failed for order #1006. Please retry.', FALSE);