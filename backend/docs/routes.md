# Backend Routes

These routes are mounted in `backend/src/app.js`.

## Auth
Mounted at `/api/auth`

- `POST /register`
- `POST /login`
- `POST /logout`
- `GET /me`
- `POST /refresh`

## Users
Mounted at `/api/user`

- `GET /`
- `GET /:id`
- `PUT /:id`
- `DELETE /:id`

## Products
Mounted at `/api/products`

- `GET /`
- `GET /:id`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

## Categories
Mounted at `/api/categories`

- `GET /`
- `GET /:id`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

## Cart
Mounted at `/api/cart`

- `GET /`
- `POST /`
- `DELETE /clear`
- `PUT /:itemId`
- `DELETE /:itemId`

## Orders
Mounted at `/api/orders`

- `GET /`
- `GET /all`
- `GET /:id`
- `POST /`
- `PUT /:id/status`

## Payments
Mounted at `/api/payment`

- `POST /checkout`
- `GET /:id`

## Reviews
Mounted at `/api/reviews`

- `GET /top/:count`
- `POST /`
- `GET /`
- `GET /order/:order_id`
- `DELETE /:id`

## Notifications
Mounted at `/api/notifications`

- `GET /user`
- `GET /admin`
- `POST /`
- `PATCH /read-all`
- `DELETE /all`
- `GET /:id`
- `PATCH /:id/read`
- `DELETE /:id`

## Support
Mounted at `/api/support`

- `GET /me`
- `POST /me/messages`
- `GET /guest/:visitorKey`
- `POST /guest/:visitorKey/messages`
- `GET /admin/threads`
- `GET /admin/threads/:id`
- `POST /admin/threads/:id/reply`
- `PATCH /admin/threads/:id/read`
- `PATCH /admin/threads/:id/close`

## Notes
- `cart`, `orders`, `payments`, `reviews` (except `GET /top/:count`), `notifications`, and `support` routes use `authMiddleware`.
- `users` is mounted at `/api/user` in the current app, not `/api/users`.
- `payments` is mounted at `/api/payment` in the current app, not `/api/payments`.
- `orders` includes `GET /all` and `PUT /:id/status` in the current router.
