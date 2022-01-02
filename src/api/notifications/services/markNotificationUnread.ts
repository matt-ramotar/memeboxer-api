import { DocumentType } from "@typegoose/typegoose";
import { NotificationModel } from "../../../models";
import Notification from "../models/Notification";

export default async function markNotificationUnread(notificationId: string): Promise<DocumentType<Notification>> {
  try {
    const notification = await NotificationModel.findById(notificationId);
    if (!notification) throw new Error();

    notification.isRead = false;
    await notification.save();

    return notification;
  } catch (error) {
    throw error;
  }
}
