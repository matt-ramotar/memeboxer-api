import { MemeNotFound, MemeTagNotFound } from "../../../errors";
import { MemeModel, MemeTagModel } from "../../../models";

export default async function addMemeTag(memeId: string, memeTagId: string): Promise<void> {
  try {
    const meme = await MemeModel.findById(memeId);
    if (!meme) throw new MemeNotFound();

    const memeTag = await MemeTagModel.findById(memeTagId);
    if (!memeTag) throw new MemeTagNotFound();

    if (meme.reactionIds) meme.reactionIds.push(memeTagId);
    else meme.reactionIds = [memeTagId];

    await meme.save();
  } catch (error) {
    throw error;
  }
}
