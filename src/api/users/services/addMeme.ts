import isIn from "../../../helpers/isIn";
import { MemeModel, UserModel } from "../../../models";

export default async function addMeme(memeId: string, userId: string): Promise<void> {
  const user = await UserModel.findById(userId);
  const meme = await MemeModel.findById(memeId);

  if (!user || !meme) return;
  if (isIn(memeId, user.memeIds)) return;

  if (user.memeIds) user.memeIds.push(memeId);
  else user.memeIds = [memeId];

  await user.save();
}
