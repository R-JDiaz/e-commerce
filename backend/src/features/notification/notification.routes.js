import express from "express";
import {
  getNotificationsController,
  getNotificationController,
  createNotificationController,
  markAsReadController,
  deleteNotificationController,
} from "./notification.controller.js";

import { validateRequest } from "../../common/validation/request.js";
import {
  validateNotificationId,
  validateUserIdParam,
  validateCreateNotification,
} from "./notification.validation.js";
import authMiddleware from "../../common/middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

// 🔔 Get all notifications of a user
router.get(
  "/user/:userId",
  validateRequest(validateUserIdParam, "params"),
  getNotificationsController
);

// 🔍 Get single notification
router.get(
  "/:id",
  validateRequest(validateNotificationId, "params"),
  getNotificationController
);

// ➕ Create notification
router.post(
  "/",
  validateRequest(validateCreateNotification),
  createNotificationController
);

// ✅ Mark as read
router.patch(
  "/:id/read",
  validateRequest(validateNotificationId, "params"),
  markAsReadController
);

// ❌ Delete
router.delete(
  "/:id",
  validateRequest(validateNotificationId, "params"),
  deleteNotificationController
);

export default router;