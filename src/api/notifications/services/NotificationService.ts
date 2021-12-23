import { DocumentType } from "@typegoose/typegoose";
import Notification from "../models/Notification";
import createNotification from "./createNotification";

interface NotificationService {
  createNotification(userId: string, actionId: string): Promise<DocumentType<Notification>>;
}

export default class RealNotificationService implements NotificationService {
  public async createNotification(userId: string, actionId: string): Promise<DocumentType<Notification>> {
    return await createNotification(userId, actionId);
  }
}
