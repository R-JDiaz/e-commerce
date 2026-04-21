import { CartService } from "./cart.service.js";

export const CartController = {
  async getCart(req, res, next) {
    try {
      const userId = 3;

      const cart = await CartService.getCart(userId);

      res.json({
        success: true,
        data: cart,
      });
    } catch (err) {
      next(err);
    }
  },

  async addItem(req, res, next) {
    try {
      const userId = 3;

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
    } catch (err) {
      next(err);
    }
  },

  async updateItem(req, res, next) {
    try {
      const userId = 3;

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
    } catch (err) {
      next(err);
    }
  },

  async removeItem(req, res, next) {
    try {
      const userId = 3;

      const { productId } = req.body;

      const result = await CartService.deleteProduct(
        userId,
        productId
      );

      res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  async clearCart(req, res, next) {
    try {
      const userId = req.user.id;

      const result = await CartService.deleteCart(userId);

      res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
};