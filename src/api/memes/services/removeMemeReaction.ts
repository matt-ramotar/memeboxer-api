import { MemeModel } from "../../../models";

export default async function removeMemeReaction(memeReactionId: string, memeId: string): Promise<void> {
  const meme = await MemeModel.findById(memeId);

  if (!meme || !meme.reactionIds) return;

  meme.reactionIds = meme.reactionIds.filter((id) => id != memeReactionId);

  await meme.save();
}
