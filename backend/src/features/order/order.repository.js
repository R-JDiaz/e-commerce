import BaseModel from "../../common/model/orm/base.js";

export default class OrderRepository extends BaseModel {
    static table = "orders";

    // 🔹 Get orders (simple)
    static async findByUserId(userId) {
        const [rows] = await this.pool.query(
            `SELECT *
             FROM ${this.table}
             WHERE user_id = ?`,
            [userId]
        );

        return rows;
    }

    // 🔹 Update order status
    static async updateStatus(orderId, status) {
        const [result] = await this.pool.query(
            `UPDATE ${this.table}
             SET status = ?
             WHERE id = ?`,
            [status, orderId]
        );

        return result;
    }

    // 🔹 Get FULL order (single order) + REVIEW
    static async findFullById(orderId, db = null) {
        const conn = db ?? this.pool;
        const [rows] = await conn.query(
            `SELECT
                o.id AS order_id,
                o.user_id,
                o.total_amount,
                o.status,
                o.shipping_addr,
                o.created_at,
                pay.payment_method,
                pay.status AS payment_status,

                oi.id AS order_item_id,
                oi.product_id,
                oi.quantity,

                p.name,
                p.price AS product_price,

                pi.image_url,

                r.id AS review_id,
                r.rating AS review_rating,
                r.comment AS review_comment,
                r.created_at AS review_created_at

            FROM orders o
            LEFT JOIN order_items oi ON oi.order_id = o.id
            LEFT JOIN products p ON p.id = oi.product_id
            LEFT JOIN product_images pi ON pi.product_id = p.id

            -- 🔥 REVIEW JOIN
            LEFT JOIN order_reviews r ON r.order_id = o.id
            LEFT JOIN payments pay ON pay.order_id = o.id

            WHERE o.id = ?`,
            [orderId]
        );

        return rows;
    }

    // 🔹 Get FULL orders (by user) + REVIEW
    static async findFullByUserId(userId) {
        const [rows] = await this.pool.query(
            `SELECT
                o.id AS order_id,
                o.user_id,
                o.total_amount,
                o.status,
                o.shipping_addr,
                o.created_at,
                pay.payment_method,
                pay.status AS payment_status,

                oi.id AS order_item_id,
                oi.product_id,
                oi.quantity,

                p.name,
                p.price AS product_price,

                pi.image_url,

                r.id AS review_id,
                r.rating AS review_rating,
                r.comment AS review_comment,
                r.created_at AS review_created_at

            FROM orders o
            LEFT JOIN order_items oi ON oi.order_id = o.id
            LEFT JOIN products p ON p.id = oi.product_id
            LEFT JOIN product_images pi ON pi.product_id = p.id

            -- 🔥 REVIEW JOIN
            LEFT JOIN order_reviews r ON r.order_id = o.id
            LEFT JOIN payments pay ON pay.order_id = o.id

            WHERE o.user_id = ?`,
            [userId]
        );

        return rows;
    }

    // 🔹 Get FULL orders (all users) + REVIEW
    static async findFullAll() {
        const [rows] = await this.pool.query(
            `SELECT
                o.id AS order_id,
                o.user_id,
                o.total_amount,
                o.status,
                o.shipping_addr,
                o.created_at,
                pay.payment_method,
                pay.status AS payment_status,

                oi.id AS order_item_id,
                oi.product_id,
                oi.quantity,

                p.name,
                p.price AS product_price,

                pi.image_url,

                r.id AS review_id,
                r.rating AS review_rating,
                r.comment AS review_comment,
                r.created_at AS review_created_at

            FROM orders o
            LEFT JOIN order_items oi ON oi.order_id = o.id
            LEFT JOIN products p ON p.id = oi.product_id
            LEFT JOIN product_images pi ON pi.product_id = p.id

            -- 🔥 REVIEW JOIN
            LEFT JOIN order_reviews r ON r.order_id = o.id
            LEFT JOIN payments pay ON pay.order_id = o.id`
        );

        return rows;
    }
}
