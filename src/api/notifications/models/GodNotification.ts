import { DocumentType } from "@typegoose/typegoose";
import { NotificationNotFound } from "../../../errors";
import { NotificationModel } from "../../../models";
import Action from "../../actions/models/Action";
import { GodAction } from "../../actions/models/GodAction";
import User from "../../users/models/User";

export interface GodNotification {
  id: string;
  user: User;
  action: GodAction;
  isRead: boolean;
}

export class RealGodNotification implements GodNotification {
  readonly id: string;
  readonly isRead: boolean;
  user!: User;
  action!: GodAction;

  constructor(id: string, isRead: boolean) {
    this.id = id;
    this.isRead = isRead;
  }

  public async populate() {
    try {
      const notification = await NotificationModel.findById(this.id).populate("userId").populate("actionId").exec();

      if (!notification) throw new NotificationNotFound();

      this.user = notification.userId as unknown as DocumentType<User>;
      this.action = await (notification.actionId as unknown as DocumentType<Action>).toGodAction();
    } catch (error) {
      throw error;
    }
  }
}
