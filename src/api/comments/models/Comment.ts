import { DocumentType, prop } from "@typegoose/typegoose";
import CommentReaction from "../../commentreactions/models/CommentReaction";
import CommentUpvote from "../../commentupvotes/models/CommentUpvote";
import Meme from "../../memes/models/Meme";
import User from "../../users/models/User";
import { GodComment, RealGodComment } from "./GodComment";

/**
 * @tsoaModel
 */

export default class Comment {
  @prop({ ref: () => Comment })
  id!: string;

  @prop({ ref: () => User })
  userId!: string;

  @prop({ ref: () => Comment })
  parentCommentId?: string;

  @prop({ ref: () => Comment })
  childrenCommentIds?: string[];

  @prop()
  body!: string;

  @prop({ ref: () => CommentUpvote })
  commentUpvoteIds?: string[];

  @prop({ ref: () => CommentReaction })
  commentReactionIds?: string[];

  @prop({ ref: () => Meme })
  memeId?: string;

  public async toGodComment(this: DocumentType<Comment>): Promise<GodComment> {
    const godComment = new RealGodComment(this._id, this.body);
    await godComment.populate();
    return godComment;
  }

  public toPojo(this: DocumentType<Comment>): Comment {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
