import { CommentModel } from "../../../models";

export default async function removeChildComment(commentId: string, parentCommentId: string): Promise<void> {
  const parentComment = await CommentModel.findById(parentCommentId);

  if (!parentComment || !parentComment.childrenCommentIds) return;

  parentComment.childrenCommentIds = parentComment.childrenCommentIds.filter((id) => id != commentId);

  await parentComment.save();
}
