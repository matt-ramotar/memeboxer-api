import { MemeReactionNotFound, UserNotFound } from "../../../errors";
import { MemeReactionModel, UserModel } from "../../../models";

export default async function addMemeReaction(userId: string, memeReactionId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    const memeReaction = await MemeReactionModel.findById(memeReactionId);
    if (!memeReaction) throw new MemeReactionNotFound();

    if (user.memeReactionIds) user.memeReactionIds.push(memeReactionId);
    else user.memeReactionIds = [memeReactionId];

    await user.save();
  } catch (error) {
    throw error;
  }
}
