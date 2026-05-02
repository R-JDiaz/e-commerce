import NotificationModel from "./notification.repository.js";
import AppError from "../../common/utilities/error.js";

export const getUserNotifications = async (userId) => {
  return await NotificationModel.findByUserId(userId);
};

export const getNotification = async (id) => {
  const notif = await NotificationModel.findById(id);

  if (!notif) throw new AppError("Notification not found", 404);

  return notif;
};

export const getAdminNotifications = async () => {
  return await NotificationModel.findAdminNotifications();
};

export const createNotification = async (data) => {
  const notif = await NotificationModel.create(data);
  return notif;
};

export const markNotificationAsRead = async (id) => {
  const notif = await NotificationModel.markAsRead(id);

  if (!notif) throw new AppError("Notification not found", 404);

  return notif;
};

export const deleteNotification = async (id) => {
  const result = await NotificationModel.delete(id);
  return result;
};