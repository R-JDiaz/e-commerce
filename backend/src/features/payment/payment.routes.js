import { Router } from "express";
import authMiddleware from "../../common/middleware/auth.js";
import PaymentController from "./payment.controller.js";
import { validateRequest } from "../../common/validation/request.js";
import {
  validateCheckoutPayment,
  validatePaymentId,
} from "./payment.validation.js";

const router = Router();

router.use(authMiddleware);

router.post(
  "/checkout",
  validateRequest(validateCheckoutPayment),
  PaymentController.checkoutPayment
);

router.get(
  "/:id",
  validateRequest(validatePaymentId, "params"),
  PaymentController.getPaymentById
);

export default router;
