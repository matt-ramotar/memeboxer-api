import { UserModel } from "../../../models";

export default async function removeComment(commentId: string, userId: string): Promise<void> {
  const user = await UserModel.findById(userId);

  if (!user || !user.commentIds) return;

  user.commentIds = user.commentIds.filter((id) => id != commentId);

  await user.save();
}
