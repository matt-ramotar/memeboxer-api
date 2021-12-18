import { DocumentType, prop } from "@typegoose/typegoose";
import Meme from "../../memes/models/Meme";
import Reaction from "../../reactions/models/Reaction";
import User from "../../users/models/User";

/**
 * @tsoaModel
 */

export default class MemeReaction {
  @prop({ ref: () => MemeReaction })
  id!: string;

  @prop({ ref: () => Meme })
  memeId!: string;

  @prop({ ref: () => User })
  userId!: string;

  @prop({ ref: () => Reaction })
  reactionId!: string;

  public toPojo(this: DocumentType<MemeReaction>): MemeReaction {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
