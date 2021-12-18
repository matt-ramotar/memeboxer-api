import { CommentNotFound } from "../../../errors";
import { CommentModel } from "../../../models";

export default async function addChildComment(childId: string, parentId: string): Promise<void> {
  try {
    const childComment = await CommentModel.findById(childId);
    if (!childComment) throw new CommentNotFound("Child comment not found");

    const parentComment = await CommentModel.findById(parentId);
    if (!parentComment) throw new CommentNotFound("Parent comment not found");

    if (parentComment.childrenCommentIds) parentComment.childrenCommentIds.push(childId);
    else parentComment.childrenCommentIds = [childId];

    await parentComment.save();
  } catch (error) {
    throw error;
  }
}
