import express from "express";
import authMiddleware from "../../common/middleware/auth.js";
import { CartController } from "./cart.controller.js";
import { validateRequest } from "../../common/validation/request.js";
import {
  validateAddCartItem,
  validateCartProductId,
  validateRemoveCartItem,
  validateUpdateCartItem,
} from "./cart.validation.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", CartController.getCart);
router.post("/", validateRequest(validateAddCartItem), CartController.addItem);
router.delete("/clear", CartController.clearCart);
router.put("/:itemId", validateRequest(validateCartProductId, "params"), validateRequest(validateUpdateCartItem), CartController.updateItem);
router.delete("/:itemId", validateRequest(validateCartProductId, "params"), validateRequest(validateRemoveCartItem), CartController.removeItem);

export default router;
