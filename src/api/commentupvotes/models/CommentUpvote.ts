import { DocumentType, prop } from "@typegoose/typegoose";
import Comment from "../../comments/models/Comment";
import User from "../../users/models/User";

/**
 * @tsoaModel
 */

export default class CommentUpvote {
  @prop({ ref: () => CommentUpvote })
  id!: string;

  @prop({ ref: () => Comment })
  commentId!: string;

  @prop({ ref: () => User })
  userId!: string;

  public toPojo(this: DocumentType<CommentUpvote>): CommentUpvote {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
