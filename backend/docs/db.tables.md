# 🛒 E-Commerce Database Schema

## 👤 Users
| Column         | Type            | Constraints                         |
|----------------|-----------------|-------------------------------------|
| id             | UUID / BIGINT   | PK                                  |
| email          | VARCHAR(255)    | UNIQUE, NOT NULL                    |
| password_hash  | TEXT            | NOT NULL                            |
| first_name     | VARCHAR(100)    |                                     |
| last_name      | VARCHAR(100)    |                                     |

| role           | VARCHAR(20)     | DEFAULT 'customer'                  |
| created_at     | TIMESTAMP       | DEFAULT CURRENT_TIMESTAMP           |
| updated_at     | TIMESTAMP       |                                     |

---

## 🔐 Refresh Tokens
| Column      | Type           | Constraints                              |
|-------------|----------------|------------------------------------------|
| id          | UUID/BIGINT    | PK                                       |
| user_id     | UUID/BIGINT    | FK → users(id), CASCADE                  |
| token_hash  | CHAR(64)       | UNIQUE, NOT NULL                         |
| expires_at  | DATETIME       | NOT NULL                                 |
| revoked_at  | DATETIME       | NULLABLE                                 |
| created_at  | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP                |

---

## 📂 Categories
| Column     | Type          | Constraints               |
|------------|--------------|---------------------------|
| id         | UUID/BIGINT  | PK                        |
| name       | VARCHAR(100) | UNIQUE, NOT NULL          |
| slug       | VARCHAR(120) | UNIQUE, NOT NULL          |
| created_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

---

## 🛍️ Products
| Column       | Type           | Constraints                          |
|--------------|----------------|--------------------------------------|
| id           | UUID/BIGINT    | PK                                   |
| name         | VARCHAR(255)   | NOT NULL                             |
| description  | TEXT           |                                      |
| price        | DECIMAL(10,2)  | NOT NULL, CHECK (price >= 0)         |
| stock        | INT            | DEFAULT 0, CHECK (stock >= 0)        |
| category_id  | UUID/BIGINT    | FK → categories(id), SET NULL        |
| created_at   | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP            |
| updated_at   | TIMESTAMP      |                                      |

---

## 🖼️ Product Images
| Column     | Type         | Constraints                     |
|------------|--------------|---------------------------------|
| id         | UUID/BIGINT  | PK                              |
| product_id | UUID/BIGINT  | FK → products(id), CASCADE      |
| image_url  | TEXT         | NOT NULL                        |
| is_primary | BOOLEAN      | DEFAULT FALSE                   |

---

## 🛒 Carts
| Column     | Type         | Constraints                     |
|------------|--------------|---------------------------------|
| id         | UUID/BIGINT  | PK                              |
| user_id    | UUID/BIGINT  | UNIQUE, FK → users(id), CASCADE |
| created_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP       |

---

## 🛒 Cart Items
| Column     | Type         | Constraints                                      |
|------------|--------------|--------------------------------------------------|
| id         | UUID/BIGINT  | PK                                               |
| cart_id    | UUID/BIGINT  | FK → carts(id), CASCADE                          |
| product_id | UUID/BIGINT  | FK → products(id), CASCADE                       |
| quantity   | INT          | NOT NULL, CHECK (quantity > 0)                   |

**Unique Constraint:** (cart_id, product_id)

---

## 📦 Orders
| Column        | Type           | Constraints                              |
|---------------|----------------|------------------------------------------|
| id            | UUID/BIGINT    | PK                                       |
| user_id       | UUID/BIGINT    | FK → users(id)                           |
| total_amount  | DECIMAL(10,2)  | NOT NULL                                 |
| status        | VARCHAR(20)    | DEFAULT 'pending'                        |
| shipping_addr | TEXT           | NOT NULL                                 |
| created_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP                |

**Status Values:** pending, paid, shipped, completed, cancelled

---

## 📦 Order Items
| Column     | Type           | Constraints                     |
|------------|----------------|---------------------------------|
| id         | UUID/BIGINT    | PK                              |
| order_id   | UUID/BIGINT    | FK → orders(id), CASCADE        |
| product_id | UUID/BIGINT    | FK → products(id)               |
| price      | DECIMAL(10,2)  | NOT NULL                        |
| quantity   | INT            | NOT NULL                        |

---

## 💳 Payments
| Column         | Type           | Constraints                      |
|----------------|----------------|----------------------------------|
| id             | UUID/BIGINT    | PK                               |
| order_id       | UUID/BIGINT    | UNIQUE, FK → orders(id)          |
| amount         | DECIMAL(10,2)  | NOT NULL                         |
| payment_method | VARCHAR(50)    |                                  |
| status         | VARCHAR(20)    | DEFAULT 'pending'                |
| transaction_id | VARCHAR(255)   |                                  |
| created_at     | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP        |

---

# 🔗 Relationships Summary

- User → Cart (1:1)
- User → Orders (1:N)
- User → Refresh Tokens (1:N)
- Order → Order Items (1:N)
- Product → Category (N:1)
- Cart → Cart Items (1:N)
