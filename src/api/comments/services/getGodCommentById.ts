import { CommentNotFound } from "../../../errors";
import { CommentModel } from "../../../models";
import { GodComment } from "../models/GodComment";

export default async function getGodCommentById(commentId: string): Promise<GodComment> {
  try {
    const comment = await CommentModel.findById(commentId);
    if (!comment) throw new CommentNotFound();
    return await comment.toGodComment();
  } catch (error) {
    throw error;
  }
}
