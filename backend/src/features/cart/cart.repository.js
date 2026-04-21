import BaseModel from "../../common/model/orm/base.js";

export default class CartRepository extends BaseModel {
    static table = "carts";

    static async findFullByUserId(userId) {
        const [rows] = await this.pool.query(
            `
            SELECT 
            c.id AS cart_id,
            c.user_id,
            c.created_at,

            ci.id AS cart_item_id,
            ci.product_id AS cart_item_product_id,
            ci.quantity,

            p.id AS product_id,
            p.name,
            p.price,
            p.description,
            p.stock,

            pi.image_url

            FROM carts c
            LEFT JOIN cart_items ci ON ci.cart_id = c.id
            LEFT JOIN products p ON p.id = ci.product_id
            LEFT JOIN product_images pi ON pi.product_id = p.id

            WHERE c.user_id = ?
            `,
            [userId]
        );

        return rows;
    }

    static async findByUserId(userId) {
        const [rows] = await this.pool.query(
        `SELECT * FROM ${this.table} WHERE user_id = ?`,
        [userId]
        );
        return rows[0];
    }
}