# E-Commerce Database Schema

This document reflects the MySQL migrations in `backend/src/core/database/migrations`.

## users
| Column | Type | Constraints |
| --- | --- | --- |
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password_hash | VARCHAR(255) | NOT NULL |
| first_name | VARCHAR(100) | NULL |
| last_name | VARCHAR(100) | NULL |
| phone | VARCHAR(30) | NULL |
| role | ENUM('customer', 'admin') | DEFAULT 'customer' |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

## refresh_tokens
| Column | Type | Constraints |
| --- | --- | --- |
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| user_id | BIGINT UNSIGNED | NOT NULL, FK -> users(id) ON DELETE CASCADE |
| token_hash | CHAR(64) | UNIQUE, NOT NULL |
| expires_at | DATETIME | NOT NULL |
| revoked_at | DATETIME | DEFAULT NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

Indexes:
- `idx_refresh_tokens_user_id (user_id)`
- `idx_refresh_tokens_expires_at (expires_at)`

## categories
| Column | Type | Constraints |
| --- | --- | --- |
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| name | VARCHAR(100) | UNIQUE, NOT NULL |
| slug | VARCHAR(120) | UNIQUE, NOT NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

## products
| Column | Type | Constraints |
| --- | --- | --- |
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| name | VARCHAR(255) | UNIQUE, NOT NULL |
| description | TEXT | NULL |
| price | DECIMAL(10,2) | NOT NULL |
| stock | INT | DEFAULT 0 |
| category_id | BIGINT UNSIGNED | NULL, FK -> categories(id) ON DELETE SET NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

## product_images
| Column | Type | Constraints |
| --- | --- | --- |
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| product_id | BIGINT UNSIGNED | NOT NULL, FK -> products(id) ON DELETE CASCADE |
| image_url | TEXT | NOT NULL |
| is_primary | BOOLEAN | DEFAULT FALSE |

## carts
| Column | Type | Constraints |
| --- | --- | --- |
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| user_id | BIGINT UNSIGNED | UNIQUE, NOT NULL, FK -> users(id) ON DELETE CASCADE |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

## cart_items
| Column | Type | Constraints |
| --- | --- | --- |
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| cart_id | BIGINT UNSIGNED | NOT NULL, FK -> carts(id) ON DELETE CASCADE |
| product_id | BIGINT UNSIGNED | NOT NULL, FK -> products(id) ON DELETE CASCADE |
| quantity | INT | NOT NULL |

Unique key:
- `unique_cart_product (cart_id, product_id)`

## orders
| Column | Type | Constraints |
| --- | --- | --- |
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| user_id | BIGINT UNSIGNED | NOT NULL, FK -> users(id) ON DELETE CASCADE |
| total_amount | DECIMAL(10,2) | NOT NULL |
| status | VARCHAR(20) | DEFAULT 'pending' |
| shipping_addr | TEXT | NOT NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

## order_items
| Column | Type | Constraints |
| --- | --- | --- |
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| order_id | BIGINT UNSIGNED | NOT NULL, FK -> orders(id) ON DELETE CASCADE |
| product_id | BIGINT UNSIGNED | NOT NULL, FK -> products(id) |
| price | DECIMAL(10,2) | NOT NULL |
| quantity | INT | NOT NULL |

## payments
| Column | Type | Constraints |
| --- | --- | --- |
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| order_id | BIGINT UNSIGNED | UNIQUE, NOT NULL, FK -> orders(id) ON DELETE CASCADE |
| amount | DECIMAL(10,2) | NOT NULL |
| payment_method | VARCHAR(50) | NULL |
| status | VARCHAR(20) | DEFAULT 'pending' |
| transaction_id | VARCHAR(255) | NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

## addresses
| Column | Type | Constraints |
| --- | --- | --- |
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| user_id | BIGINT UNSIGNED | UNIQUE, NOT NULL, FK -> users(id) ON DELETE CASCADE ON UPDATE CASCADE |
| address_line | VARCHAR(255) | NULL |
| city | VARCHAR(100) | NULL |
| state | VARCHAR(100) | NULL |
| postal_code | VARCHAR(20) | NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

## order_reviews
| Column | Type | Constraints |
| --- | --- | --- |
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| order_id | BIGINT UNSIGNED | NOT NULL, UNIQUE, FK -> orders(id) ON DELETE CASCADE |
| user_id | BIGINT UNSIGNED | NOT NULL, FK -> users(id) ON DELETE CASCADE |
| rating | TINYINT | NOT NULL, CHECK (rating BETWEEN 1 AND 5) |
| comment | TEXT | NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

## notifications
| Column | Type | Constraints |
| --- | --- | --- |
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| user_id | BIGINT UNSIGNED | NULL, FK -> users(id) ON DELETE CASCADE |
| target_role | ENUM('customer', 'admin') | NOT NULL, DEFAULT 'customer' |
| type | ENUM('order', 'payment', 'system') | NOT NULL, DEFAULT 'system' |
| message | TEXT | NOT NULL |
| is_read | BOOLEAN | DEFAULT FALSE |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

Indexes:
- `idx_user_id (user_id)`
- `idx_target_role (target_role)`
- `idx_is_read (is_read)`
- `idx_created_at (created_at)`

## support_threads
| Column | Type | Constraints |
| --- | --- | --- |
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| user_id | BIGINT UNSIGNED | NULL |
| visitor_key | VARCHAR(80) | NULL |
| user_name | VARCHAR(255) | NOT NULL |
| user_email | VARCHAR(255) | NULL |
| status | ENUM('open', 'closed') | NOT NULL, DEFAULT 'open' |
| unread_count | INT UNSIGNED | NOT NULL, DEFAULT 0 |
| messages | JSON | NOT NULL |
| last_message_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

Unique keys:
- `unique_support_user (user_id)`
- `unique_support_visitor (visitor_key)`

## Relationships
- users 1:1 carts
- users 1:N orders
- users 1:N refresh_tokens
- users 1:1 addresses
- users 1:N order_reviews
- users 1:N notifications
- users 1:N support_threads
- categories 1:N products
- products 1:N product_images
- carts 1:N cart_items
- orders 1:N order_items
- orders 1:1 payments
