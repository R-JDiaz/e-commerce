import express from "express";
import { CategoryController } from "./category.controller.js";
import { validateRequest } from "../../common/validation/request.js";
import {
    validateCategoryId,
    validateCreateCategory,
    validateUpdateCategory,
} from "./category.validation.js";

const router = express.Router();

// public
router.get("/", CategoryController.getAll);
router.get("/:id", validateRequest(validateCategoryId, "params"), CategoryController.getById);

// admin (you can add middleware later)
router.post("/", validateRequest(validateCreateCategory), CategoryController.create);
router.put("/:id", validateRequest(validateCategoryId, "params"), validateRequest(validateUpdateCategory), CategoryController.update);
router.delete("/:id", validateRequest(validateCategoryId, "params"), CategoryController.delete);

export default router;
