import { DocumentType, prop } from "@typegoose/typegoose";
import Comment from "../../comments/models/Comment";
import Reaction from "../../reactions/models/Reaction";
import User from "../../users/models/User";

/**
 * @tsoaModel
 */

export default class CommentReaction {
  @prop({ ref: () => CommentReaction })
  id!: string;

  @prop({ ref: () => Comment })
  commentId!: string;

  @prop({ ref: () => User })
  userId!: string;

  @prop({ ref: () => Reaction })
  reactionId!: string;

  public toPojo(this: DocumentType<CommentReaction>): CommentReaction {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
