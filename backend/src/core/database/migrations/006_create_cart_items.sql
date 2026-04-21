CREATE TABLE IF NOT EXISTS cart_items (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  cart_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  quantity INT NOT NULL,

  CONSTRAINT fk_cart
    FOREIGN KEY (cart_id)
    REFERENCES carts(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_cart_product
    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE,

  UNIQUE KEY unique_cart_product (cart_id, product_id)
);