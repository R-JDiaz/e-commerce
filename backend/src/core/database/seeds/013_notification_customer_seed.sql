INSERT INTO notifications (user_id, target_role, type, message, is_read)
VALUES
(3, 'customer', 'order', 'Your order #1001 has been placed successfully', TRUE),
(3, 'customer', 'payment', 'Payment received for order #1001', TRUE),
(3, 'customer', 'order', 'Your order #1001 has been shipped', FALSE),

(4, 'customer', 'order', 'Your order #1002 has been placed successfully', TRUE),
(4, 'customer', 'payment', 'Payment received for order #1002', FALSE),

(5, 'customer', 'order', 'Your order #1003 has been placed successfully', TRUE),

(6, 'customer', 'order', 'Your order #1004 has been delivered', FALSE),

(7, 'customer', 'system', 'Welcome to our store!', TRUE),

(8, 'customer', 'order', 'Your order #1005 is being processed', FALSE),

(9, 'customer', 'payment', 'Payment failed for order #1006. Please retry.', FALSE);