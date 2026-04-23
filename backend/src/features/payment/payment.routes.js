import { Router } from "express";
import PaymentController from "./payment.controller.js";
import { validateRequest } from "../../common/validation/request.js";
import {
  validateCheckoutPayment,
  validatePaymentId,
} from "./payment.validation.js";

const router = Router();

// Create payment (checkout)
router.post(
  "/checkout",
  validateRequest(validateCheckoutPayment),
  PaymentController.checkoutPayment
);

// Get payment by ID
router.get(
  "/:id",
  validateRequest(validatePaymentId, "params"),
  PaymentController.getPaymentById
);

export default router;
