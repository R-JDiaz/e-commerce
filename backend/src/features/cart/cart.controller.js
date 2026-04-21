import { CartService } from "./cart.service.js";

export const CartController = {
  async getCart(req, res, next) {
    try {
      const userId = 3; // assuming auth middleware
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
      const userId = req.user.id;
      const { productId, quantity } = req.body;

      const result = await CartService.addItemToCart(
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
      const { itemId } = req.params;
      const { quantity } = req.body;

      const result = await CartService.updateCartItem(itemId, quantity);

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
      const { itemId } = req.params;

      const result = await CartService.removeCartItem(itemId);

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

      const result = await CartService.clearCart(userId);

      res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
};