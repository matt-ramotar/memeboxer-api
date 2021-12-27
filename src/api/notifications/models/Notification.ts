/**
 * @tsoaModel
 */

import { DocumentType, prop } from "@typegoose/typegoose";
import Action from "../../actions/models/Action";
import User from "../../users/models/User";
import { GodNotification, RealGodNotification } from "./GodNotification";

export default class Notification {
  @prop()
  id!: string;

  @prop({ ref: () => User })
  userId!: string;

  @prop({ ref: () => Action })
  actionId!: string;

  @prop()
  isRead!: boolean;

  @prop()
  created!: Date;

  public async toGodNotification(this: DocumentType<Notification>): Promise<GodNotification> {
    const godNotification = new RealGodNotification(this._id, this.isRead);
    await godNotification.populate();
    return godNotification;
  }

  public toPojo(this: DocumentType<Notification>): Notification {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
