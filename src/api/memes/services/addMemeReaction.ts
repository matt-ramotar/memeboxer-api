import { MemeNotFound, MemeReactionNotFound } from "../../../errors";
import { MemeModel, MemeReactionModel } from "../../../models";

export default async function addMemeReaction(memeId: string, memeReactionId: string): Promise<void> {
  try {
    const meme = await MemeModel.findById(memeId);
    if (!meme) throw new MemeNotFound();

    const memeReaction = await MemeReactionModel.findById(memeReactionId);
    if (!memeReaction) throw new MemeReactionNotFound();

    if (meme.reactionIds) meme.reactionIds.push(memeReactionId);
    else meme.reactionIds = [memeReactionId];

    await meme.save();
  } catch (error) {
    throw error;
  }
}
