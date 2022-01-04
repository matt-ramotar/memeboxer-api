import { DocumentType } from "@typegoose/typegoose";
import CommentReaction from "../models/CommentReaction";
import createCommentReaction from "./createCommentReaction";

interface CommentReactionService {
  createCommentReaction(commentId: string, userId: string, reactionId: string): Promise<DocumentType<CommentReaction>>;
}

export default class RealCommentReactionService implements CommentReactionService {
  public async createCommentReaction(commentId: string, userId: string, reactionId: string): Promise<DocumentType<CommentReaction>> {
    return await createCommentReaction(commentId, userId, reactionId);
  }
}
