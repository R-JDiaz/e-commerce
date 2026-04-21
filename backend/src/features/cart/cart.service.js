import { cartFullDTO } from "../../common/dtos/cart.js";
import { productCartDTO } from "../../common/dtos/product.js";
import ProductRepository from "../products/product.repository.js";
import CartRepository from "./cart.repository.js";
import CartItemRepository from "./cart_item/cart_item.repository.js";

export const CartService = {
  async getCart(userId) {
    const result = await CartRepository.findFullByUserId(userId);

    if (!result || result.length === 0) {
      throw new Error("No CART FOUND");
    }

    return cartFullDTO(result);
  },

  async addItemToCart(userId, productId, quantity) {
    const cart = await CartRepository.isUserIdHaveCart(userId);

    if (!cart) {
      const cart = await CartRepository.create(userId);
    }

    const result = await CartItemRepository.findByCartId(cart.id);

    if (!result) {
      const res = await CartItemRepository.create({cart_id: cart.id, product_id: productId,quantity});
    }
    const new_qty = quantity + result.quantity;

    const res = await CartItemRepository.update(cart.id, {productId, new_qty});

    return res;
  },

  async updateCartItem(cartId,productId, quantity) {
    const item = await CartItemModel.findById(productId);
    if (!item) throw new Error("Cart item not found");

    const updated = await CartItemRepository.update(cartId, {product_id: productId, quantity: quantity});

    return updated;
  },

  async removeCartItem(cartId, productId) {
    const item = await CartItemModel.findById(cartId, productId);
    if (!item) throw new Error("Cart item not found");

    await CartItemRepository.deleteProductInCart(cartId, productId);

    return true;
  },

  async clearCart(userId) {
    const cart = await CartModel.findByUserId(userId);
    if (!cart) return null;

    await CartItemRepository.clearCart(cart.id);

    return true;
  }
};