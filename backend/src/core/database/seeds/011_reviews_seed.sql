INSERT INTO order_reviews (order_id, user_id, rating, comment)
VALUES
-- USER 1
(1, 1, 3, 'Order is okay, but still pending for a long time.'),
(2, 1, 5, 'Fast payment confirmation and smooth process.'),
(5, 1, 5, 'Super smooth transaction. Very satisfied with the order!'),

-- USER 2
(6, 2, 2, 'Too slow processing, needs improvement.'),
(9, 2, 4, 'Good service and fast delivery. Packaging could be improved.'),

-- USER 3
(12, 3, 4, 'Order accepted quickly, everything went fine.'),
(13, 3, 2, 'Return process was confusing and slow.'),

-- USER 4
(14, 4, 5, 'Excellent experience! Will definitely order again.'),
(15, 4, 3, 'Shipped but delivery took longer than expected.'),

-- USER 5
(16, 5, 5, 'Great value for money, very satisfied.');