import { UserModel } from "../../../models";

export default async function removeMeme(memeId: string, userId: string): Promise<void> {
  const user = await UserModel.findById(userId);

  if (!user || !user.memeIds) return;

  user.memeIds = user.memeIds.filter((id) => id != memeId);

  await user.save();
}
