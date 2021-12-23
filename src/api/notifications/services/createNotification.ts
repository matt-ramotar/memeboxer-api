import { DocumentType } from "@typegoose/typegoose";
import { NotificationModel } from "../../../models";
import Notification from "../models/Notification";

export default async function createNotification(userId: string, actionId: string): Promise<DocumentType<Notification>> {
  try {
    return await NotificationModel.create({ userId, actionId });
  } catch (error) {
    throw error;
  }
}