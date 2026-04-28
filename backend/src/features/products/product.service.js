import { categoryDTO } from "../../common/dtos/category.js";
import { productListDTO, productDetailDTO, productDTO } from "../../common/dtos/product.js";
import ProductRepository from "./product.repository.js";

export const ProductService = {
  async getAllProducts() {
        const rows = await ProductRepository.findAllFull();

        const map = new Map();

        for (const row of rows) {
            if (!map.has(row.product_id)) {
                map.set(row.product_id, {
                    product: {
                        id: row.product_id,
                        name: row.name,
                        price: row.price,
                        stock: row.stock,
                        category_name: row.category_name
                    },
                    image: null
                });
            }

            const item = map.get(row.product_id);

            if (row.image_id && !item.image) {
                item.image = {
                    image_url: row.image_url
                };
            }
        }

        return [...map.values()].map(item =>
            productListDTO(item.product, item.image)
        );
    },

  async getProductById(id) {
        const rows = await ProductRepository.findFullById(id);

        if (!rows || rows.length === 0) return null;

        const first = rows[0];

        const product = productDTO(first);
        
        const category = categoryDTO(first);

        console.log(category);

        const images = rows
            .filter(r => r.image_id)
            .map(r => ({
                id: r.image_id,
                image_url: r.image_url
            }));

        return productDetailDTO(product, category, images);
    },

  async createProduct(data) {
    return await ProductRepository.create(data);
  },

  async updateProduct(id, data) {
    const product = await ProductRepository.findById(id);
    if (!product) throw new Error("Product not found");

    return await ProductRepository.update(id, data);
  },

  async deleteProduct(id) {
    const product = await ProductRepository.findById(id);
    if (!product) throw new Error("Product not found");

    return await ProductRepository.delete(id);
  },
};