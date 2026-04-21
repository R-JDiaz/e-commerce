## AUTH
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me          // get current user
POST   /api/auth/refresh     // refresh token

## USERS 
GET    /api/users            // admin: get all users
GET    /api/users/:id        // get single user
PUT    /api/users/:id        // update user
DELETE /api/users/:id        // delete user

## PRODUCTS
GET    /api/products             // list all products
GET    /api/products/:id         // get product details
POST   /api/products             // create product (admin)
PUT    /api/products/:id         // update product (admin)
DELETE /api/products/:id         // delete product (admin)


## CATEGORIES
GET    /api/categories
POST   /api/categories           // admin
PUT    /api/categories/:id       // admin
DELETE /api/categories/:id       // admin

## CART
GET    /api/cart                 // get user's cart
POST   /api/cart                 // add item to cart
PUT    /api/cart/:itemId         // update quantity
DELETE /api/cart/:itemId         // remove item
DELETE /api/cart/clear           // clear cart

## ORDER
GET    /api/orders               // get user orders
GET    /api/orders/:id           // get order details
POST   /api/orders               // create order (checkout)
PUT    /api/orders/:id/status    // update status (admin)

## PAYMENT 
POST   /api/payments/checkout
POST   /api/payments/webhook     // for payment gateway callbacks
GET    /api/payments/:id         // payment details

