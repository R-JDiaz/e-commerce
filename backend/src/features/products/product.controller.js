import { ProductService } from "./product.service.js";

export const ProductController = {
  async getAll(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.json(product);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  async create(req, res) {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const product = await ProductService.updateProduct(
        req.params.id,
        req.body
      );
      res.json(product);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      await ProductService.deleteProduct(req.params.id);
      res.json({ message: "Product deleted" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
};