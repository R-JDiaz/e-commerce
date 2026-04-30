import AppError from "../../common/utilities/error.js";
import { CartService } from "../cart/cart.service.js";
import { productCartDTO } from "../../common/dtos/product.js";
import {
    orderItemFullDTO,
    orderListDTO,
    orderDetailDTO
} from "../../common/dtos/order.js";

import OrderRepository from "./order.repository.js";
import OrderItemRepository from "./order_items/order_items.repository.js";
import { withTransaction } from "../../common/utilities/handler.js";

export default class OrderService {

    // 🔹 1. BUILD ORDER DATA ONLY (NO DB SIDE EFFECTS)
    async buildOrderFromCart(userId, shipping_addr) {
        const cart = await CartService.getCart(userId);

        if (!cart.products || cart.products.length === 0) {
            throw new AppError("Cart is empty", 400);
        }

        const items = cart.products.map(p => productCartDTO(p));

        const total_amount = items.reduce(
            (sum, item) => sum + (item.price * item.quantity),
            0
        );

        return {
            user_id: userId,
            total_amount,
            shipping_addr,
            items
        };
    }

    // 🔹 2. CREATE ORDER (ATOMIC)
    async createOrder(userId, data) {
        const { shipping_addr } = data;

        return await withTransaction(OrderRepository.pool, async (conn) => {

            // 1. build order
            const orderData = await this.buildOrderFromCart(userId, shipping_addr);

            // 2. create order
            const result = await OrderRepository.create({ 
                user_id: orderData.user_id,
                total_amount: orderData.total_amount,
                status: "pending",
                shipping_addr: orderData.shipping_addr
            });

            if (!result || result.affectedRows === 0) {
                throw new AppError("Order failed to create", 500);
            }

            const orderId = result.insertId;

            // 3. insert order items
            await OrderItemRepository.createBulk(orderId, orderData.items, conn);

            // 4. clear cart
            await CartService.deleteCart(userId, conn);

            // 5. fetch full order (JOIN)
            const rows = await OrderRepository.findFullById(orderId, conn);

            console.log("JOIN", orderDetailDTO(rows));
            return orderDetailDTO(rows);
        });
    }

    // 🔹 3. GET ALL USER ORDERS
    async getUserOrders(userId) {
        const rows = await OrderRepository.findFullByUserId(userId);

        if (!rows || rows.length === 0) {
            throw new AppError("No orders found", 404);
        }

        // group by order_id
        const ordersMap = {};

        rows.forEach(row => {
            if (!ordersMap[row.order_id]) {
                ordersMap[row.order_id] = [];
            }
            ordersMap[row.order_id].push(row);
        });

        console.log(ordersMap);
        return Object.values(ordersMap).map(group =>
            orderListDTO(group)
        );
    }

    // ðŸ”¹ 3b. GET ALL ORDERS (ADMIN)
    async getAllOrders() {
        const rows = await OrderRepository.findFullAll();

        if (!rows || rows.length === 0) {
            throw new AppError("No orders found", 404);
        }

        const ordersMap = {};

        rows.forEach(row => {
            if (!ordersMap[row.order_id]) {
                ordersMap[row.order_id] = [];
            }
            ordersMap[row.order_id].push(row);
        });

        console.log(ordersMap);
        return Object.values(ordersMap).map(group =>
            orderDetailDTO(group)
        );
    }

    // 🔹 4. GET SINGLE ORDER (SECURE)
    async getOrderById(userId, orderId) {
        const rows = await OrderRepository.findFullById(orderId);

        console.log(rows);
        if (!rows || rows.length === 0) {
            throw new AppError("Order not found", 404);
        }

        // security check
        if (rows[0].user_id !== userId) {
            throw new AppError("Unauthorized access to order", 403);
        }

        return orderDetailDTO(rows);
    }

    // 🔹 5. UPDATE ORDER STATUS
    async updateOrderStatus(orderId, status) {
        const validStatuses = [
            "pending",
            "accepted",
            "paid",
            "shipped",
            "completed",
            "cancelled",
            "refund"
        ];

        if (!validStatuses.includes(status)) {
            throw new AppError("Invalid order status", 400);
        }

        const result = await OrderRepository.updateStatus(orderId, status);

        if (!result || result.affectedRows === 0) {
            throw new AppError("Order not found", 404);
        }

        const rows = await OrderRepository.findFullById(orderId);

        return orderListDTO(rows);
    }

    // 🔹 6. CANCEL ORDER
    async cancelOrder(userId, orderId) {
        const rows = await OrderRepository.findFullById(orderId);

        if (!rows || rows.length === 0) {
            throw new AppError("Order not found", 404);
        }

        const order = rows[0];

        // ownership check
        if (order.user_id !== userId) {
            throw new AppError("Unauthorized", 403);
        }

        // business rule
        if (["shipped", "completed"].includes(order.status)) {
            throw new AppError("Cannot cancel this order", 400);
        }

        await OrderRepository.updateStatus(orderId, "cancelled");

        const updatedRows = await OrderRepository.findFullById(orderId);

        return orderListDTO(updatedRows);
    }
}
