import { DocumentType, prop } from "@typegoose/typegoose";
import Meme from "../../memes/models/Meme";
import User from "../../users/models/User";
import { GodTag, RealGodTag } from "./GodTag";

/**
 * @tsoaModel
 */

export default class Tag {
  @prop()
  id!: string;

  @prop()
  tag!: string;

  @prop({ ref: () => Meme })
  memeIds?: string[];

  @prop({ ref: () => User })
  userIds?: string[];

  public async toGodTag(this: DocumentType<Tag>): Promise<GodTag> {
    const godTag = new RealGodTag(this._id, this.tag);
    await godTag.populate();
    return godTag;
  }

  public toPojo(this: DocumentType<Tag>): Tag {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
