import CommentReaction from "../models/CommentReaction";
import createCommentReaction from "./createCommentReaction";

interface CommentReactionService {
  createCommentReaction(commentId: string, userId: string, reactionId: string): Promise<CommentReaction>;
}

export default class RealCommentReactionService implements CommentReactionService {
  public async createCommentReaction(commentId: string, userId: string, reactionId: string): Promise<CommentReaction> {
    return await createCommentReaction(commentId, userId, reactionId);
  }
}
