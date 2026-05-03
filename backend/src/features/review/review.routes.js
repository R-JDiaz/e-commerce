import { Router } from "express";
import authMiddleware from "../../common/middleware/auth.js";
import { validateRequest } from "../../common/validation/request.js";

import OrderReviewController from "./review.controller.js";
import {
  validateCreateReview,
  validateReviewId,
  validateOrderId
} from "./review.validation.js";

const router = Router();

router.get("/top/:count", OrderReviewController.getTopReviews);

router.use(authMiddleware);

// -------------------------
// CREATE REVIEW
// -------------------------
router.post(
  "/",
  validateRequest(validateCreateReview),
  OrderReviewController.createReview
);

// -------------------------
// GET USER REVIEWS
// -------------------------
router.get(
  "/",
  OrderReviewController.getUserReviews
);


// -------------------------
// GET REVIEW BY ORDER
// -------------------------
router.get(
  "/order/:order_id",
  validateRequest(validateOrderId, "params"),
  OrderReviewController.getReviewByOrderId
);

// -------------------------
// DELETE REVIEW
// -------------------------
router.delete(
  "/:id",
  validateRequest(validateReviewId, "params"),
  OrderReviewController.deleteReview
);

export default router;