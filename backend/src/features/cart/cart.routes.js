import express from "express";
import { CartController } from "./cart.controller.js";

const router = express.Router();

router.get("/", CartController.getCart);
router.post("/", CartController.addItem);

router.put("/:itemId", CartController.updateItem);
router.delete("/:itemId", CartController.removeItem);
router.delete("/clear", CartController.clearCart);

export default router;