import express from "express";
import { CategoryController } from "./category.controller.js";

const router = express.Router();

// public
router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);

// admin (you can add middleware later)
router.post("/", CategoryController.create);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.delete);

export default router;