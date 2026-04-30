INSERT INTO orders (user_id, total_amount, status, shipping_addr)
VALUES
-- ======================
-- USER 1
-- ======================
(1, 340.00, 'pending',   'Barangay Centro, Tuguegarao City'),
(1, 500.00, 'paid',      'Barangay Centro, Tuguegarao City'),
(1, 450.00, 'accepted',  'Barangay Centro, Tuguegarao City'),
(1, 420.00, 'shipped',   'Barangay Centro, Tuguegarao City'),
(1, 220.00, 'completed', 'Barangay Centro, Tuguegarao City'),

-- ======================
-- USER 2
-- ======================
(2, 260.00, 'pending',   'Pattao, Cagayan'),
(2, 275.00, 'paid',      'Pattao, Cagayan'),
(2, 300.00, 'accepted',  'Pattao, Cagayan'),
(2, 180.00, 'completed', 'Pattao, Cagayan'),
(2, 150.00, 'returned',  'Pattao, Cagayan'),

-- ======================
-- USER 3
-- ======================
(3, 150.00, 'cancelled', 'Aparri, Cagayan'),
(3, 190.00, 'accepted',  'Aparri, Cagayan'),
(3, 210.00, 'returned',  'Aparri, Cagayan'),

-- ======================
-- USER 4
-- ======================
(4, 420.00, 'completed', 'Lallo, Cagayan'),
(4, 360.00, 'accepted',  'Lallo, Cagayan'),
(4, 390.00, 'shipped',   'Lallo, Cagayan'),

-- ======================
-- USER 5
-- ======================
(5, 310.00, 'pending',   'Camalaniugan, Cagayan'),
(5, 280.00, 'shipped',   'Camalaniugan, Cagayan'),
(5, 330.00, 'paid',      'Camalaniugan, Cagayan');