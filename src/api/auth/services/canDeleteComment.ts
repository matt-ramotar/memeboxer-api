import jwt from "jsonwebtoken";
import { CommentModel, UserModel } from "../../../models";
import { KEYS } from "../../../util/secrets";
import { AuthToken } from "../entities/tokens";

export default async function canDeleteComment(userId: string, commentId: string, token: string): Promise<boolean> {
  const comment = await CommentModel.findById(commentId);
  const user = await UserModel.findById(userId);
  const decoded = jwt.verify(token, KEYS!) as AuthToken;

  return Boolean(comment && user && user._id == decoded.userId && comment.userId == decoded.userId);
}
