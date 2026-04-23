import { asyncHandler } from "../../common/utilities/handler.js";
import OrderService from "./order.service.js";

const orderService = new OrderService();

export default class OrderController {

    // 🔹 CREATE ORDER
    static createOrder = asyncHandler(async (req, res) => {
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
    });

    // 🔹 GET ALL USER ORDERS
    static getUserOrders = asyncHandler(async (req, res) => {
        const userId = 3;

        const result = await orderService.getUserOrders(userId);

        return res.status(200).json({
            success: true,
            data: result
        });
    });

    // 🔹 GET SINGLE ORDER
    static getOrderById = asyncHandler(async (req, res) => {
        const userId = 2;
        const { id } = req.params;

        const result = await orderService.getOrderById(
            userId,
            Number(id)
        );

        return res.status(200).json({
            success: true,
            data: result
        });
    });

    // 🔹 UPDATE ORDER STATUS (ADMIN / SYSTEM)
    static updateOrderStatus = asyncHandler(async (req, res) => {
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
    });

    // 🔹 CANCEL ORDER
    static cancelOrder = asyncHandler(async (req, res) => {
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
    });
}
