import { DocumentType, prop } from "@typegoose/typegoose";
import CommentReaction from "../../commentreactions/models/CommentReaction";
import Comment from "../../comments/models/Comment";
import MemeReaction from "../../memereactions/models/MemeReaction";
import Meme from "../../memes/models/Meme";
import MemeTag from "../../memetags/models/MemeTag";
import Tag from "../../tags/models/Tag";
import Template from "../../templates/models/Template";
import User from "../../users/models/User";
import { ActionType } from "./ActionType";
import { GodAction, RealGodAction } from "./GodAction";

/**
 * @tsoaModel
 */

export default class Action {
  @prop()
  id!: string;

  @prop()
  type!: ActionType;

  @prop()
  datetime!: Date;

  @prop({ ref: () => User })
  userId!: string;

  @prop({ ref: () => User })
  otherUserId?: string;

  @prop({ ref: () => Template })
  templateId?: string;

  @prop({ ref: () => Meme })
  memeId?: string;

  @prop({ ref: () => Tag })
  tagId?: string;

  @prop({ ref: () => Comment })
  commentId?: string;

  @prop({ ref: () => Comment })
  otherCommentId?: string;

  @prop({ ref: () => MemeReaction })
  memeReactionId?: string;

  @prop({ ref: () => CommentReaction })
  commentReactionId?: string;

  @prop({ ref: () => MemeTag })
  memeTagId?: string;

  public async toGodAction(this: DocumentType<Action>): Promise<GodAction> {
    const godAction = new RealGodAction(this._id, this.type, this.datetime);
    await godAction.populate({
      userId: this.userId,
      otherUserId: this.otherUserId,
      templateId: this.templateId,
      memeId: this.memeId,
      tagId: this.tagId,
      commentId: this.commentId,
      otherCommentId: this.otherCommentId,
      memeReactionId: this.memeReactionId,
      commentReactionId: this.commentReactionId,
      memeTagId: this.memeTagId
    });
    return godAction;
  }

  public toPojo(this: DocumentType<Action>): Action {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
