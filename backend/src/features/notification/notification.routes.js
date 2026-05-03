import express from "express";
import {
  getNotificationsController,
  getNotificationController,
  getAdminNotificationsController,
  createNotificationController,
  markAsReadController,
  markAllAsReadController,
  deleteNotificationController,
  deleteAllNotificationsController,
} from "./notification.controller.js";

import { validateRequest } from "../../common/validation/request.js";
import {
  validateNotificationId,
  validateCreateNotification,
} from "./notification.validation.js";
import authMiddleware from "../../common/middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.get(
  "/user",
  getNotificationsController
);

router.get(
  "/admin",
  getAdminNotificationsController
);

router.post(
  "/",
  validateRequest(validateCreateNotification),
  createNotificationController
);

router.patch(
  "/read-all",
  markAllAsReadController
);

router.delete(
  "/all",
  deleteAllNotificationsController
);

router.get(
  "/:id",
  validateRequest(validateNotificationId, "params"),
  getNotificationController
);

router.patch(
  "/:id/read",
  validateRequest(validateNotificationId, "params"),
  markAsReadController
);

router.delete(
  "/:id",
  validateRequest(validateNotificationId, "params"),
  deleteNotificationController
);

export default router;
