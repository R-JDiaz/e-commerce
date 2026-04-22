import OrderService from "./order.service.js";

const orderService = new OrderService();

export default class OrderController {

    // 🔹 CREATE ORDER
    static async createOrder(req, res, next) {
        try {
            const userId = 2; // from auth middleware
            const { shipping_addr } = req.body;

            const result = await orderService.createOrder(userId, {
                shipping_addr
            });

            return res.status(201).json({
                success: true,
                message: "Order created successfully",
                data: result
            });

        } catch (err) {
            next(err);
        }
    }

    // 🔹 GET ALL USER ORDERS
    static async getUserOrders(req, res, next) {
        try {
            const userId = 3;

            const result = await orderService.getUserOrders(userId);

            return res.status(200).json({
                success: true,
                data: result
            });

        } catch (err) {
            next(err);
        }
    }

    // 🔹 GET SINGLE ORDER
    static async getOrderById(req, res, next) {
        try {
            const userId = 2;
            const { id } = req.params;

            console.log(id);
            const result = await orderService.getOrderById(
                userId,
                Number(id)
            );

            return res.status(200).json({
                success: true,
                data: result
            });

        } catch (err) {
            next(err);
        }
    }

    // 🔹 UPDATE ORDER STATUS (ADMIN / SYSTEM)
    static async updateOrderStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const result = await orderService.updateOrderStatus(
                Number(id),
                status
            );

            return res.status(200).json({
                success: true,
                message: "Order status updated",
                data: result
            });

        } catch (err) {
            next(err);
        }
    }

    // 🔹 CANCEL ORDER
    static async cancelOrder(req, res, next) {
        try {
            const userId = 3;
            const { id } = req.params;

            const result = await orderService.cancelOrder(
                userId,
                Number(id)
            );

            return res.status(200).json({
                success: true,
                message: "Order cancelled",
                data: result
            });

        } catch (err) {
            next(err);
        }
    }
}