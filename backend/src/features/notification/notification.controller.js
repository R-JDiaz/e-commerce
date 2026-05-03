import {
  getUserNotifications,
  getNotification,
  getAdminNotifications,
  createNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  deleteAllNotifications,
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

export const getAdminNotificationsController = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  
  const notifications = await getAdminNotifications();
  res.json(notifications);
});

export const createNotificationController = asyncHandler(async (req, res) => {
  const notif = await createNotification(req.body);
  res.status(201).json(notif);
});

export const markAsReadController = asyncHandler(async (req, res) => {
  const notif = await markNotificationAsRead(req.params.id);
  res.json(notif);
});

export const markAllAsReadController = asyncHandler(async (req, res) => {
  const updatedCount = await markAllNotificationsAsRead(req.user);
  res.json({
    message: "Notifications marked as read successfully",
    updatedCount,
  });
});

export const deleteNotificationController = asyncHandler(async (req, res) => {
  await deleteNotification(req.params.id);
  res.json({ message: "Notification deleted successfully" });
});

export const deleteAllNotificationsController = asyncHandler(async (req, res) => {
  const deletedCount = await deleteAllNotifications(req.user);
  res.json({
    message: "Notifications deleted successfully",
    deletedCount,
  });
});
