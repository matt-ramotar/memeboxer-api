import { DocumentType, prop } from "@typegoose/typegoose";
import Meme from "../../memes/models/Meme";
import User from "../../users/models/User";

/**
 * @tsoaModel
 */

export default class MemeUpvote {
  @prop({ ref: () => MemeUpvote })
  id!: string;

  @prop({ ref: () => Meme })
  memeId!: string;

  @prop({ ref: () => User })
  userId!: string;

  public toPojo(this: DocumentType<MemeUpvote>): MemeUpvote {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
