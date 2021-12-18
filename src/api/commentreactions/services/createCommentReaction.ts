import { CommentReactionModel } from "../../../models";
import CommentReaction from "../models/CommentReaction";

export default async function createCommentReaction(commentId: string, userId: string, reactionId: string): Promise<CommentReaction> {
  try {
    const commentReaction = await CommentReactionModel.create({
      commentId,
      userId,
      reactionId
    });

    return await commentReaction.toPojo();
  } catch (error) {
    throw error;
  }
}
