import { asyncHandler } from "../../common/utilities/handler.js";
import { CartService } from "./cart.service.js";

export const CartController = {
  getCart: asyncHandler(async (req, res) => {
      const userId = req.user.id;

      const cart = await CartService.getCart(userId);

      res.json({
        success: true,
        data: cart,
      });
    }),

  addItem: asyncHandler(async (req, res) => {
      const userId = req.user.id;

      const { productId, quantity } = req.body;

      const result = await CartService.addProduct(
        userId,
        productId,
        quantity
      );

      res.status(201).json({
        success: true,
        data: result,
      });
    }),

  updateItem: asyncHandler(async (req, res) => {
      const userId = req.user.id;

      const { productId, quantity } = req.body;

      const result = await CartService.updateProductQuantity(
        userId,
        productId,
        quantity
      );

      res.json({
        success: true,
        data: result,
      });
    }),

  removeItem: asyncHandler(async (req, res) => {
      const userId = req.user.id;

      const { productId } = req.body;

      const result = await CartService.deleteProduct(
        userId,
        productId
      );

      res.json({
        success: true,
        data: result,
      });
    }),

  clearCart: asyncHandler(async (req, res) => {
      const userId = req.user.id;

      const result = await CartService.deleteCart(userId);

      res.json({
        success: true,
        data: result,
      });
    }),
};
