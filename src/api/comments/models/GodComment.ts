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
  parentComment?: GodComment;
  childrenComments?: GodComment[];
  body: string;
  commentUpvotes?: CommentUpvote[];
  commentReactions?: CommentReaction[];
  meme?: GodMeme;
}

export class RealGodComment implements GodComment {
  readonly id: string;
  user!: User;
  parentComment?: GodComment;
  childrenComments?: GodComment[];
  readonly body: string;
  commentUpvotes?: CommentUpvote[];
  commentReactions?: CommentReaction[];
  meme?: GodMeme;

  constructor(id: string, body: string) {
    this.id = id;
    this.body = body;
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

      this.user = comment.userId as unknown as DocumentType<User>;

      if (comment.parentCommentId) this.parentComment = await (comment.parentCommentId as unknown as DocumentType<Comment>).toGodComment();

      const childrenComments = [];

      for (const childComment of comment.childrenCommentIds as unknown as DocumentType<Comment>[]) {
        childrenComments.push(await childComment.toGodComment());
      }

      this.childrenComments = childrenComments;

      this.commentUpvotes = comment.commentUpvoteIds as unknown as DocumentType<CommentUpvote>[];
      this.commentReactions = comment.commentReactionIds as unknown as DocumentType<CommentReaction>[];

      this.meme = await (comment.memeId as unknown as DocumentType<Meme>).toGodMeme();
    } catch (error) {
      throw error;
    }
  }
}