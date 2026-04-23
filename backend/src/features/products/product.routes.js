import express from "express";
import { ProductController } from "./product.controller.js";
import { validateRequest } from "../../common/validation/request.js";
import {
  validateCreateProduct,
  validateProductId,
  validateUpdateProduct,
} from "./product.validation.js";

const router = express.Router();

router.get("/", ProductController.getAll);
router.get("/:id", validateRequest(validateProductId, "params"), ProductController.getById);
router.post("/", validateRequest(validateCreateProduct), ProductController.create);
router.put("/:id", validateRequest(validateProductId, "params"), validateRequest(validateUpdateProduct), ProductController.update);
router.delete("/:id", validateRequest(validateProductId, "params"), ProductController.delete);

export default router;
