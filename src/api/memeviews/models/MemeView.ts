/**
 * @tsoaModel
 */

import { DocumentType, prop } from "@typegoose/typegoose";
import Meme from "../../memes/models/Meme";
import User from "../../users/models/User";

export default class MemeView {
  @prop()
  id!: string;

  @prop({ ref: () => Meme })
  memeId!: string;

  @prop({ ref: () => User })
  userId!: string;

  @prop()
  datetime!: Date;

  public toPojo(this: DocumentType<MemeView>): MemeView {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
