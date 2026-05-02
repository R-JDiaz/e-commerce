import {
  getUserNotifications,
  getNotification,
  createNotification,
  markNotificationAsRead,
  deleteNotification,
} from "./notification.service.js";

import { asyncHandler } from "../../common/utilities/handler.js";

export const getNotificationsController = asyncHandler(async (req, res) => {
  const notifications = await getUserNotifications(req.params.userId);
  res.json(notifications);
});

export const getNotificationController = asyncHandler(async (req, res) => {
  const notif = await getNotification(req.params.id);
  res.json(notif);
});

export const createNotificationController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const data = {...req.body, user_id: userId };
  const notif = await createNotification(data);
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