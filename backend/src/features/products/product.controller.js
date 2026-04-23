import { asyncHandler } from "../../common/utilities/handler.js";
import { ProductService } from "./product.service.js";

export const ProductController = {
  getAll: asyncHandler(async (req, res) => {
      const products = await ProductService.getAllProducts();
      res.json(products);
    }),

  getById: asyncHandler(async (req, res) => {
      const product = await ProductService.getProductById(req.params.id);
      res.json(product);
    }),

  create: asyncHandler(async (req, res) => {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json(product);
    }),

  update: asyncHandler(async (req, res) => {
      const product = await ProductService.updateProduct(
        req.params.id,
        req.body
      );
      res.json(product);
    }),

  delete: asyncHandler(async (req, res) => {
      await ProductService.deleteProduct(req.params.id);
      res.json({ message: "Product deleted" });
    }),
};
