import { Router } from "express";
import PaymentController from "./payment.controller.js";
import authMiddleware from "../../common/middleware/auth.js";

const router = Router();

// Create payment (checkout)
router.post(
  "/checkout",
  PaymentController.checkoutPayment
);

// Get payment by ID
router.get(
  "/:id",
  PaymentController.getPaymentById
);

export default router;