INSERT INTO order_items (order_id, product_id, price, quantity)
VALUES
-- Order 1 (User 1)
(1, 1, 80.00, 2),   -- Espresso Shot x2
(1, 5, 150.00, 1),  -- Caffe Latte x1
(1, 16, 90.00, 2),  -- Croissant x2

-- Order 2 (User 1)
(2, 3, 120.00, 1),  -- Americano x1
(2, 9, 160.00, 1),  -- Iced Latte x1

-- Order 3 (User 2)
(3, 4, 100.00, 1),  -- Black Coffee x1
(3, 18, 140.00, 1), -- Cheesecake Slice x1

-- Order 4 (User 2)
(4, 12, 180.00, 2), -- Mocha Frappe x2
(4, 20, 130.00, 1), -- Ham & Cheese Sandwich x1

-- Order 5 (User 3)
(5, 14, 160.00, 1), -- Matcha Latte x1

-- Order 6 (User 4)
(6, 5, 150.00, 2),  -- Caffe Latte x2
(6, 23, 150.00, 1), -- Pancake Stack x1

-- Order 7 (User 5)
(7, 10, 170.00, 1), -- Cold Brew x1
(7, 21, 140.00, 1); -- Chicken Sandwich x1