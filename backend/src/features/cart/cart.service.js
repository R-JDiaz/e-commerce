import { cartFullDTO } from "../../common/dtos/cart.js";
import { productCartDTO } from "../../common/dtos/product.js";
import CartRepository from "./cart.repository.js";
import CartItemRepository from "./cart_item/cart_item.repository.js";

export const CartService = {
  async getOrCreate(userId) {
    let cart = await CartRepository.findByUserId(userId);

    if (!cart) {
      cart = await CartRepository.create({ user_id: userId });
    }

    return cart;
  },

  async getCart(userId) {
    const result = await CartRepository.findFullByUserId(userId);

    if (!result || result.length === 0) {
      throw new Error("No CART FOUND");
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
    const cart = await CartRepository.findByUserId(userId);
    if (!cart) throw new Error("Cart not found");

    await CartItemRepository.deleteByCartId(cart.id);
    await CartRepository.delete(cart.id);

    return true;
  }
};