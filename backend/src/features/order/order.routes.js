import { Router } from "express";
import OrderController from "./order.controller.js";
import authMiddleware from "../../common/middleware/auth.js";
// import adminMiddleware from "../../common/middleware/admin.middleware.js";

const router = Router();


// 🔹 ALL ROUTES REQUIRE AUTH
//router.use(authMiddleware);


// 🔸 GET /api/orders
// get all orders of logged-in user
router.get(
    "/",
    OrderController.getUserOrders
);


// 🔸 GET /api/orders/:id
// get single order details
router.get(
    "/:id",
    OrderController.getOrderById
);


// 🔸 POST /api/orders
// create order (checkout)
router.post(
    "/",
    OrderController.createOrder
);


// 🔸 PUT /api/orders/:id/status
// update order status (admin only)
router.put(
    "/:id/status",
    // adminMiddleware, // enable when you have roles
    OrderController.updateOrderStatus
);


export default router;