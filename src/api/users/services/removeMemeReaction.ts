import { UserModel } from "../../../models";

export default async function removeMemeReaction(memeReactionId: string, userId: string): Promise<void> {
  const user = await UserModel.findById(userId);

  if (!user || !user.memeReactionIds) return;

  user.memeReactionIds = user.memeReactionIds.filter((id) => id != memeReactionId);

  await user.save();
}
