-- 009_payments_seed.sql

INSERT INTO payments (order_id, amount, payment_method, status, transaction_id)
VALUES
-- Completed payments
(2, 220.00, 'cash', 'paid', 'CASH-0001'),
(3, 180.00, 'gcash', 'paid', 'GCASH-TRX-10001'),
(4, 260.00, 'gcash', 'paid', 'GCASH-TRX-10002'),
(6, 420.00, 'cash', 'paid', 'CASH-0002'),

-- Pending payments
(1, 340.00, 'gcash', 'pending', NULL),
(7, 310.00, 'gcash', 'pending', NULL),

-- Failed payment example
(5, 150.00, 'gcash', 'failed', 'GCASH-FAILED-9001');