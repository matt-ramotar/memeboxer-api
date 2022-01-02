import { DocumentType } from "@typegoose/typegoose";
import Notification from "../models/Notification";
import createNotification from "./createNotification";
import markNotificationRead from "./markNotificationRead";
import markNotificationUnread from "./markNotificationUnread";

interface NotificationService {
  createNotification(userId: string, actionId: string): Promise<DocumentType<Notification>>;
  markNotificationRead(notificationId: string): Promise<DocumentType<Notification> | void>;
  markNotificationUnread(notificationId: string): Promise<DocumentType<Notification>>;
}

export default class RealNotificationService implements NotificationService {
  public async createNotification(userId: string, actionId: string): Promise<DocumentType<Notification>> {
    return await createNotification(userId, actionId);
  }

  public async markNotificationRead(notificationId: string): Promise<DocumentType<Notification> | void> {
    return await markNotificationRead(notificationId);
  }

  public async markNotificationUnread(notificationId: string): Promise<DocumentType<Notification>> {
    return await markNotificationUnread(notificationId);
  }
}
