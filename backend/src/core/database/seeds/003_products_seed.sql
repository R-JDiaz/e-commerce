INSERT INTO products (name, description, price, stock, category_id)
VALUES
-- Espresso Drinks
('Espresso Shot', 'Strong concentrated coffee shot', 80.00, 100, 1),
('Doppio', 'Double espresso shot', 120.00, 100, 1),

-- Americano & Black Coffee
('Americano', 'Espresso with hot water', 120.00, 100, 2),
('Black Coffee', 'Classic brewed coffee', 100.00, 100, 2),

-- Latte & Milk-Based Drinks
('Caffe Latte', 'Espresso with steamed milk', 150.00, 100, 3),
('Cappuccino', 'Espresso with milk foam', 150.00, 100, 3),
('Vanilla Latte', 'Latte with vanilla syrup', 170.00, 100, 3),

-- Iced Coffee
('Iced Americano', 'Chilled espresso with water', 130.00, 100, 4),
('Iced Latte', 'Espresso with milk over ice', 160.00, 100, 4),

-- Cold Brew
('Classic Cold Brew', 'Slow-steeped cold coffee', 170.00, 100, 5),
('Vanilla Cold Brew', 'Cold brew with vanilla flavor', 190.00, 100, 5),

-- Frappes & Blended Drinks
('Mocha Frappe', 'Blended coffee with chocolate', 180.00, 100, 6),
('Caramel Frappe', 'Blended coffee with caramel', 180.00, 100, 6),

-- Tea & Non-Coffee Drinks
('Matcha Latte', 'Green tea with milk', 160.00, 100, 7),
('Chai Latte', 'Spiced tea with milk', 150.00, 100, 7),

-- Pastries
('Butter Croissant', 'Flaky buttery pastry', 90.00, 100, 8),
('Chocolate Muffin', 'Soft muffin with chocolate chips', 100.00, 100, 8),

-- Cakes & Desserts
('Cheesecake Slice', 'Creamy baked cheesecake', 140.00, 100, 9),
('Chocolate Cake Slice', 'Rich chocolate cake', 150.00, 100, 9),

-- Sandwiches
('Ham & Cheese Sandwich', 'Toasted sandwich with ham and cheese', 130.00, 100, 10),
('Chicken Sandwich', 'Grilled chicken sandwich', 140.00, 100, 10),

-- Breakfast Meals
('Breakfast Plate', 'Eggs, toast, and sausage', 180.00, 100, 11),
('Pancake Stack', 'Fluffy pancakes with syrup', 150.00, 100, 11),

-- Add-ons & Extras
('Extra Espresso Shot', 'Additional coffee shot', 40.00, 200, 12),
('Caramel Syrup', 'Sweet caramel flavor add-on', 20.00, 200, 12);