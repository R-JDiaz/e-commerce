import { cartFullDTO } from "../../common/dtos/cart.js";
import { productCartDTO } from "../../common/dtos/product.js";
import AppError from "../../common/utilities/error.js";
import CartRepository from "./cart.repository.js";
import CartItemRepository from "./cart_item/cart_item.repository.js";
import UserModel from "../user/user.repository.js";

export const CartService = {
  async ensureUserExists(userId, conn = null) {
    const user = await UserModel.findById(userId, conn);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  },

  async getOrCreate(userId, conn = null) {
    await this.ensureUserExists(userId, conn);

    let cart = await CartRepository.findByUserId(userId);

    if (!cart) {
      cart = await CartRepository.createForUser(userId, conn);
    }

    return cart;
  },

  async getCart(userId) {
    await this.ensureUserExists(userId);

    const result = await CartRepository.findFullByUserId(userId);

    if (!result || result.length === 0) {
      await CartRepository.createForUser(userId);
      return cartFullDTO([]);
    }

    return cartFullDTO(result);
  },

  async addProduct(userId, productId, quantity) {

    const cart = await this.getOrCreate(userId);

    const existingItem = await CartItemRepository.findItemByCartId(
      cart.id,
      productId
    );
    
    let cart_item;

    if (!existingItem) {
      cart_item = await CartItemRepository.create({
        cart_id: cart.id,
        product_id: productId,
        quantity
      });
    } else {
      cart_item = await CartItemRepository.updateItemQuantityByCartId(
        cart.id,
        productId,
        quantity + existingItem.quantity
      );
    }

    if (!cart_item) throw new Error("Failed to add product");

    return this.getCart(userId);
  },

  async updateProductQuantity(userId, productId, quantity) {

    const cart = await this.getOrCreate(userId);

    const existing = await CartItemRepository.findItemByCartId(
      cart.id,
      productId
    );

    if (!existing) throw new Error("Item not found in cart");

    await CartItemRepository.updateItemQuantityByCartId(
      cart.id,
      productId,
      quantity
    );

    return this.getCart(userId);
  },

  async deleteProduct(userId, productId) {

      const cart = await this.getOrCreate(userId);

      await CartItemRepository.deleteItemByCartId(cart.id, productId);

      return this.getCart(userId);
  },

  async deleteCart(userId) {
    await this.ensureUserExists(userId);

    const cart = await CartRepository.findByUserId(userId);
    if (!cart) throw new Error("Cart not found");

    await CartItemRepository.deleteByCartId(cart.id);
    await CartRepository.delete(cart.id);

    return true;
  }
};
