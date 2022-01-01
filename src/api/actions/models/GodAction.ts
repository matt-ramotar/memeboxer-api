import { CommentNotFound, CommentReactionNotFound, MemeNotFound, MemeReactionNotFound, TagNotFound, TemplateNotFound, UserNotFound } from "../../../errors";
import { CommentModel, CommentReactionModel, MemeModel, MemeReactionModel, TagModel, TemplateModel, UserModel } from "../../../models";
import CommentReaction from "../../commentreactions/models/CommentReaction";
import Comment from "../../comments/models/Comment";
import { default as MemeReaction } from "../../memereactions/models/MemeReaction";
import Meme from "../../memes/models/Meme";
import Tag from "../../tags/models/Tag";
import Template from "../../templates/models/Template";
import { GodUser } from "../../users/models/GodUser";
import { Refs } from "../entities/Refs";
import { ActionType } from "./ActionType";

export interface GodAction {
  id: string;
  type: ActionType;
  datetime: Date;
  user?: GodUser;
  otherUser?: GodUser;
  template?: Template;
  meme?: Meme;
  tag?: Tag;
  comment?: Comment;
  otherComment?: Comment;
  memeReaction?: MemeReaction;
  commentReaction?: CommentReaction;
}

export class RealGodAction implements GodAction {
  readonly id: string;
  readonly type: ActionType;
  readonly datetime: Date;
  user?: GodUser;
  otherUser?: GodUser;
  template?: Template;
  meme?: Meme;
  tag?: Tag;
  comment?: Comment;
  otherComment?: Comment;
  memeReaction?: MemeReaction;
  commentReaction?: CommentReaction;

  constructor(id: string, type: ActionType, datetime: Date) {
    this.id = id;
    this.type = type;
    this.datetime = datetime;
  }

  public async populate(refs: Refs) {
    const { userId, otherUserId, templateId, memeId, tagId, commentId, otherCommentId, memeReactionId, commentReactionId } = refs;

    if (userId) await this.setUser(userId);
    if (otherUserId) await this.setOtherUser(otherUserId);
    if (templateId) await this.setTemplate(templateId);
    if (memeId) await this.setMeme(memeId);
    if (tagId) await this.setTag(tagId);
    if (commentId) await this.setComment(commentId);
    if (otherCommentId) await this.setOtherComment(otherCommentId);
    if (memeReactionId) await this.setMemeReaction(memeReactionId);
    if (commentReactionId) await this.setCommentReaction(commentReactionId);
  }

  private async setUser(id: string): Promise<void> {
    try {
      const user = await UserModel.findById(id);
      if (!user) throw new UserNotFound();
      else this.user = await user.toGodUser();
    } catch (error) {
      throw error;
    }
  }

  private async setOtherUser(id: string): Promise<void> {
    try {
      const otherUser = await UserModel.findById(id);
      if (!otherUser) throw new UserNotFound();
      else this.otherUser = await otherUser.toGodUser();
    } catch (error) {
      this.otherUser = undefined;
    }
  }

  private async setTemplate(id: string): Promise<void> {
    try {
      const template = await TemplateModel.findById(id);
      if (!template) throw new TemplateNotFound();
      else this.template = template;
    } catch (error) {
      this.template = undefined;
    }
  }

  private async setMeme(id: string): Promise<void> {
    try {
      const meme = await MemeModel.findById(id);
      if (!meme) throw new MemeNotFound();
      else this.meme = meme;
    } catch (error) {
      this.meme = undefined;
    }
  }

  private async setTag(id: string): Promise<void> {
    try {
      const tag = await TagModel.findById(id);
      if (!tag) throw new TagNotFound();
      else this.tag = tag.toPojo();
    } catch (error) {
      this.tag = undefined;
    }
  }

  private async setComment(id: string): Promise<void> {
    try {
      const comment = await CommentModel.findById(id);
      if (!comment) throw new CommentNotFound();
      else this.comment = comment.toPojo();
    } catch (error) {
      this.comment = undefined;
    }
  }

  private async setOtherComment(id: string): Promise<void> {
    try {
      const otherComment = await CommentModel.findById(id);
      if (!otherComment) throw new CommentNotFound();
      else this.otherComment = otherComment.toPojo();
    } catch (error) {
      this.otherComment = undefined;
    }
  }

  private async setMemeReaction(id: string): Promise<void> {
    try {
      const memeReaction = await MemeReactionModel.findById(id);
      if (!memeReaction) throw new MemeReactionNotFound();
      else this.memeReaction = memeReaction.toPojo();
    } catch (error) {
      this.memeReaction = undefined;
    }
  }

  private async setCommentReaction(id: string): Promise<void> {
    try {
      const commentReaction = await CommentReactionModel.findById(id);
      if (!commentReaction) throw new CommentReactionNotFound();
      else this.commentReaction = commentReaction.toPojo();
    } catch (error) {
      this.commentReaction = undefined;
    }
  }
}
