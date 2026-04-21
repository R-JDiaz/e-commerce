import BaseModel from "../../common/model/orm/base.js";

export default class ProductRepository extends BaseModel {
  static table = "products";


  static async findFullById(id) {
        const [rows] = await this.pool.query(
            `SELECT 
                p.id AS product_id,
                p.name,
                p.description,
                p.price,
                p.stock,
                p.category_id,
                p.created_at,
                p.updated_at,
                c.id AS category_id,
                c.name AS category_name,
                c.slug AS category_slug,
                pi.id AS image_id,
                pi.image_url
            FROM products p
            LEFT JOIN product_images pi ON pi.product_id = p.id
            LEFT JOIN categories c ON c.id = p.category_id
            WHERE p.id = ?`,
            [id]
        );

        return rows; 
    }

  static async findAllFull() {
        const [rows] = await this.pool.query(
            `SELECT 
                p.id AS product_id,
                p.name,
                p.description,
                p.price,
                p.stock,
                p.category_id,
                c.name AS category_name,
                pi.id AS image_id,
                pi.image_url
            FROM products p
            LEFT JOIN product_images pi ON pi.product_id = p.id
            LEFT JOIN categories c ON c.id = p.category_id`
        );

        return rows;
    }
}