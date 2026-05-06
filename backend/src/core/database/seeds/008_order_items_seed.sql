INSERT INTO order_items (order_id, product_id, price, quantity)
VALUES
-- Order 1 (User 1)
(1, 1, 90.00, 2),
(1, 5, 170.00, 1),
(1, 16, 100.00, 2),

-- Order 2 (User 1)
(2, 3, 170.00, 1),
(2, 7, 180.00, 1),

-- Order 3 (User 2)
(3, 4, 100.00, 1),
(3, 18, 150.00, 1),

-- Order 4 (User 2)
(4, 12, 190.00, 2),
(4, 19, 120.00, 1),

-- Order 5 (User 3)
(5, 14, 150.00, 1),

-- Order 6 (User 4)
(6, 5, 170.00, 2),
(6, 15, 190.00, 1),

-- Order 7 (User 5)
(7, 9, 170.00, 1),
(7, 10, 185.00, 1);