import { CommentModel } from "../../../models";
import Comment from "../models/Comment";

export default async function deleteComment(commentId: string): Promise<Comment | null> {
  return await CommentModel.findByIdAndDelete(commentId);
}
