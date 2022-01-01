import { MemeTagNotFound, UserNotFound } from "../../../errors";
import { MemeTagModel, UserModel } from "../../../models";

export default async function addMemeTag(userId: string, memeTagId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    const memeTag = await MemeTagModel.findById(memeTagId);
    if (!memeTag) throw new MemeTagNotFound();

    if (user.memeTagIds) user.memeTagIds.push(memeTagId);
    else user.memeTagIds = [memeTagId];

    await user.save();
  } catch (error) {
    throw error;
  }
}
