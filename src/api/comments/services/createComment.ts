import { CommentModel } from "../../../models";
import { CreateCommentInput } from "../entities/CreateCommentInput";
import { GodComment } from "../models/GodComment";

export default async function createComment(input: CreateCommentInput): Promise<GodComment> {
  try {
    const comment = await CommentModel.create(input);
    return await comment.toGodComment();
  } catch (error) {
    throw error;
  }
}
