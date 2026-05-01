import { asyncHandler } from "../../common/utilities/handler.js";
import OrderService from "./order.service.js";

const orderService = new OrderService();

export default class OrderController {
    static createOrder = asyncHandler(async (req, res) => {
        const userId = req.user.id;
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

    static getUserOrders = asyncHandler(async (req, res) => {
        const userId = req.user.id;

        const result = await orderService.getUserOrders(userId);

        return res.status(200).json({
            success: true,
            data: result
        });
    });

    static getAllOrders = asyncHandler(async (req, res) => {
        const role = req.user.role;

        if (role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Forbidden",
            });
        }

        const result = await orderService.getAllOrders();

        return res.status(200).json({
            success: true,
            data: result
        });
    });

    static getOrderById = asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const role = req.user.role;
        const { id } = req.params;

        const result = await orderService.getOrderById(
            role,
            userId,
            Number(id)
        );

        return res.status(200).json({
            success: true,
            data: result
        });
    });

    static updateOrderStatus = asyncHandler(async (req, res) => {
        const role = req.user.role;
        const userId = req.user.id;
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

    static cancelOrder = asyncHandler(async (req, res) => {
        const userId = req.user.id;
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
