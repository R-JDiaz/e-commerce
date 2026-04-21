INSERT INTO orders (user_id, total_amount, status, shipping_addr)
VALUES
-- User 1 orders
(1, 340.00, 'pending', 'Barangay Centro, Tuguegarao City'),
(1, 220.00, 'completed', 'Barangay Centro, Tuguegarao City'),

-- User 2 orders
(2, 180.00, 'completed', 'Pattao, Cagayan'),
(2, 260.00, 'pending', 'Pattao, Cagayan'),

-- User 3 orders
(3, 150.00, 'cancelled', 'Aparri, Cagayan'),

-- User 4 orders
(4, 420.00, 'completed', 'Lallo, Cagayan'),

-- User 5 orders
(5, 310.00, 'pending', 'Camalaniugan, Cagayan');