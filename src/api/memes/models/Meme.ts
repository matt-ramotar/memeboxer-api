/**
 * @tsoaModel
 */

import { DocumentType, prop } from "@typegoose/typegoose";
import Comment from "../../comments/models/Comment";
import MemeReaction from "../../memereactions/models/MemeReaction";
import MemeView from "../../memeviews/models/MemeView";
import Tag from "../../tags/models/Tag";
import Template from "../../templates/models/Template";
import User from "../../users/models/User";
import { GodMeme, RealGodMeme } from "./GodMeme";

export default class Meme {
  @prop()
  id!: string;

  @prop({ ref: () => Template })
  templateId!: string;

  @prop({ ref: () => User })
  userId!: string;

  @prop()
  caption?: string;

  @prop({ ref: () => Tag })
  tagIds?: string[];

  @prop()
  location?: string;

  @prop({ ref: () => User })
  upvoteIds?: string[];

  @prop({ ref: () => Comment })
  commentIds?: string[];

  @prop({ ref: () => MemeReaction })
  reactionIds?: string[];

  @prop()
  created!: Date;

  @prop({ ref: () => MemeView })
  memeViewIds?: string[];

  public async toGodMeme(this: DocumentType<Meme>): Promise<GodMeme> {
    const godMeme = new RealGodMeme(this._id, this.created, this.caption, this.location);
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
