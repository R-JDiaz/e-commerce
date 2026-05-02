import {
  getUserNotifications,
  getNotification,
  createNotification,
  markNotificationAsRead,
  deleteNotification,
} from "./notification.service.js";

import { asyncHandler } from "../../common/utilities/handler.js";

export const getNotificationsController = asyncHandler(async (req, res) => {
  const notifications = await getUserNotifications(req.user.id);
  res.json(notifications);
});

export const getNotificationController = asyncHandler(async (req, res) => {
  const notif = await getNotification(req.params.id);
  res.json(notif);
});

export const createNotificationController = asyncHandler(async (req, res) => {
  const notif = await createNotification(req.body);
  res.status(201).json(notif);
});

export const markAsReadController = asyncHandler(async (req, res) => {
  const notif = await markNotificationAsRead(req.params.id);
  res.json(notif);
});

export const deleteNotificationController = asyncHandler(async (req, res) => {
  await deleteNotification(req.params.id);
  res.json({ message: "Notification deleted successfully" });
});