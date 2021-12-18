/**
 * @tsoaModel
 */

import { DocumentType, prop } from "@typegoose/typegoose";
import Comment from "../../comments/models/Comment";
import MemeReaction from "../../memereactions/models/MemeReaction";
import User from "../../users/models/User";
import { GodMeme, RealGodMeme } from "./GodMeme";

export default class Meme {
  @prop()
  id!: string;

  @prop()
  data!: string[];

  @prop()
  imageUrl?: string;

  @prop()
  templateId!: string;

  @prop({ ref: () => User })
  userId?: string;

  @prop({ ref: () => User })
  upvoteIds?: string[];

  @prop({ ref: () => Comment })
  commentIds?: string[];

  @prop({ ref: () => MemeReaction })
  reactionIds?: string[];

  public async toGodMeme(this: DocumentType<Meme>): Promise<GodMeme> {
    const godMeme = new RealGodMeme(this._id, this.data, this.imageUrl);
    await godMeme.populate();
    return godMeme;
  }

  public toPojo(this: DocumentType<Meme>): Meme {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
