import isIn from "../../../helpers/isIn";
import { CommentNotFound, RelationshipAlreadyExists, UserNotFound } from "../../../errors";
import { CommentModel, UserModel } from "../../../models";

export default async function addComment(userId: string, commentId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    const comment = await CommentModel.findById(commentId);
    if (!comment) throw new CommentNotFound();

    if (isIn(commentId, user.commentIds)) throw new RelationshipAlreadyExists();

    if (user.commentIds) user.commentIds.push(commentId);
    else user.commentIds = [commentId];

    await user.save();
  } catch (error) {
    throw error;
  }
}
