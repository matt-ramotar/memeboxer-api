import { DocumentType } from "@typegoose/typegoose";
import { CommentNotFound } from "../../../errors";
import { CommentModel } from "../../../models";
import CommentReaction from "../../commentreactions/models/CommentReaction";
import CommentUpvote from "../../commentupvotes/models/CommentUpvote";
import { GodMeme } from "../../memes/models/GodMeme";
import Meme from "../../memes/models/Meme";
import User from "../../users/models/User";
import Comment from "./Comment";

export interface GodComment {
  id: string;
  user: User;
  parentComment?: Comment;
  childrenComments?: Comment[];
  body: string;
  commentUpvotes?: CommentUpvote[];
  commentReactions?: CommentReaction[];
  meme?: GodMeme;
  created: Date;
}

export class RealGodComment implements GodComment {
  readonly id: string;
  user!: User;
  parentComment?: Comment;
  childrenComments?: Comment[];
  readonly body: string;
  commentUpvotes?: CommentUpvote[];
  commentReactions?: CommentReaction[];
  meme?: GodMeme;
  readonly created: Date;

  constructor(id: string, body: string, created: Date) {
    this.id = id;
    this.body = body;
    this.created = created;
  }

  public async populate() {
    try {
      const comment = await CommentModel.findById(this.id)
        .populate("userId")
        .populate("parentCommentId")
        .populate("childrenCommentIds")
        .populate("commentUpvoteIds")
        .populate("commentReactionIds")
        .populate("memeId")
        .exec();

      if (!comment) throw new CommentNotFound();

      if (comment.userId) this.user = (comment.userId as unknown as DocumentType<User>).toPojo();

      if (comment.parentCommentId) this.parentComment = await (comment.parentCommentId as unknown as DocumentType<Comment>).toPojo();

      const childrenComments = [];

      for (const childComment of comment.childrenCommentIds as unknown as DocumentType<Comment>[]) {
        childrenComments.push(childComment.toPojo());
      }

      this.childrenComments = childrenComments;

      this.commentUpvotes = comment.commentUpvoteIds as unknown as DocumentType<CommentUpvote>[];
      this.commentReactions = comment.commentReactionIds as unknown as DocumentType<CommentReaction>[];

      if (comment.memeId) this.meme = await (comment.memeId as unknown as DocumentType<Meme>).toGodMeme();
    } catch (error) {
      throw error;
    }
  }
}
