import { DocumentType, prop } from "@typegoose/typegoose";
import Meme from "../../memes/models/Meme";
import User from "../../users/models/User";

/**
 * @tsoaModel
 */

export default class MemeTag {
  @prop({ ref: () => MemeTag })
  id!: string;

  @prop({ ref: () => Meme })
  memeId!: string;

  @prop({ ref: () => User })
  userId!: string;

  @prop()
  xOffset!: number;

  @prop()
  yOffset!: number;

  public toPojo(this: DocumentType<MemeTag>): MemeTag {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
