import BaseModel from "../../../common/model/orm/base.js";

export default class CartItemRepository extends BaseModel {
    static table = "cart_items";

    static async findByCartId(id) {
        const [rows] = await this.pool.query(
        `SELECT * FROM ${this.table} WHERE cart_id = ?`,
        [id]
        );
        return rows || null;
    }

    static async clearCart(id) {
        await this.pool.query(
        `DELETE FROM ${this.table} WHERE cart_id = ?`,
        [id]
        );      
    }

    static async deleteProductInCart(cartId, productId) {
        await this.pool.query(
        `DELETE FROM ${this.table} WHERE cart_id = ? AND product_id = ?`,
        [cartId, productId]
        );
    }
}