INSERT INTO products (name, description, price, stock, category_id)
VALUES
-- ☕ HOT COFFEE (category_id = 1)
('Golden Caramel Latte', 'Smooth caramel latte with rich espresso and creamy milk', 180.00, 100, 1),
('Classic Cappuccino', 'Espresso with thick milk foam and balanced flavor', 160.00, 100, 1),
('Vanilla Bean Latte', 'Creamy latte infused with sweet vanilla notes', 170.00, 100, 1),
('Hazelnut Mocha', 'Chocolate coffee blend with roasted hazelnut flavor', 180.00, 100, 1),
('Espresso Shot', 'Strong and bold single espresso with rich crema', 90.00, 100, 1),

-- 🧊 ICED COFFEE (category_id = 2)
('Iced Caramel Macchiato', 'Layered iced coffee with caramel drizzle and milk', 190.00, 100, 2),
('Iced Vanilla Latte', 'Chilled espresso with vanilla and milk over ice', 180.00, 100, 2),
('Iced Americano', 'Refreshing iced espresso diluted with water', 130.00, 100, 2),
('Cold Brew Black', 'Smooth slow-steeped cold brew coffee', 170.00, 100, 2),
('Iced Mocha Delight', 'Chocolate iced coffee with creamy texture', 185.00, 100, 2),

-- 🍫 NON-COFFEE / SPECIALTY (category_id = 3)
('Classic Hot Chocolate', 'Rich and creamy chocolate drink', 160.00, 100, 3),
('Matcha Latte', 'Premium green tea blended with milk', 170.00, 100, 3),
('Chai Latte', 'Spiced tea latte with warm aromatic flavors', 160.00, 100, 3),
('Strawberry Milk Drink', 'Sweet strawberry milk with smooth texture', 150.00, 100, 3),
('Cookies & Cream Frappe', 'Blended creamy drink with cookie bits', 190.00, 100, 3),

-- 🥐 FOOD & PASTRIES (category_id = 4)
('Butter Croissant', 'Flaky and buttery baked pastry', 100.00, 100, 4),
('Chocolate Muffin', 'Soft muffin loaded with chocolate chips', 110.00, 100, 4),
('Blueberry Cheesecake Slice', 'Creamy cheesecake topped with blueberries', 150.00, 100, 4),
('Cinnamon Roll', 'Soft roll with cinnamon swirl and icing glaze', 120.00, 100, 4),
('Club Sandwich', 'Layered sandwich with meat, veggies, and bread', 160.00, 100, 4);