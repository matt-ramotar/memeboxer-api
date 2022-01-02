import { DocumentType } from "@typegoose/typegoose";
import { NotificationModel } from "../../../models";
import Notification from "../models/Notification";

export default async function markNotificationRead(notificationId: string): Promise<DocumentType<Notification> | void> {
  const notification = await NotificationModel.findById(notificationId);
  console.log(notificationId, notification);
  if (!notification) return;

  notification.isRead = true;
  await notification.save();

  return notification;
}
