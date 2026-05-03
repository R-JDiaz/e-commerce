import express from "express";
import authMiddleware from "../../common/middleware/auth.js";
import { validateRequest } from "../../common/validation/request.js";
import {
  validateSupportMessage,
  validateSupportThreadId,
  validateSupportVisitorKey,
} from "./support.validation.js";
import {
  closeAdminThreadController,
  createMyMessageController,
  createVisitorMessageController,
  getAdminThreadController,
  getAdminThreadsController,
  getMyThreadController,
  getVisitorThreadController,
  markAdminThreadReadController,
  replyAdminThreadController,
} from "./support.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyThreadController);
router.post(
  "/me/messages",
  authMiddleware,
  validateRequest(validateSupportMessage),
  createMyMessageController
);

router.get(
  "/guest/:visitorKey",
  validateRequest(validateSupportVisitorKey, "params"),
  getVisitorThreadController
);
router.post(
  "/guest/:visitorKey/messages",
  validateRequest(validateSupportVisitorKey, "params"),
  validateRequest(validateSupportMessage),
  createVisitorMessageController
);

router.get("/admin/threads", authMiddleware, getAdminThreadsController);
router.get(
  "/admin/threads/:id",
  authMiddleware,
  validateRequest(validateSupportThreadId, "params"),
  getAdminThreadController
);
router.post(
  "/admin/threads/:id/reply",
  authMiddleware,
  validateRequest(validateSupportThreadId, "params"),
  validateRequest(validateSupportMessage),
  replyAdminThreadController
);
router.patch(
  "/admin/threads/:id/read",
  authMiddleware,
  validateRequest(validateSupportThreadId, "params"),
  markAdminThreadReadController
);
router.patch(
  "/admin/threads/:id/close",
  authMiddleware,
  validateRequest(validateSupportThreadId, "params"),
  closeAdminThreadController
);

export default router;
