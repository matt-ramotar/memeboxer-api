import { MemeModel } from "../../../models";

export default async function removeMemeReaction(memeReactionId: string, memeId: string): Promise<void> {
  const meme = await MemeModel.findById(memeId);

  if (!meme || !meme.reactionIds) return;

  const nextMemeReactionIds = [];

  for (const reactionId of meme.reactionIds) {
    if (reactionId != memeReactionId) {
      nextMemeReactionIds.push(reactionId);
    }
  }

  meme.reactionIds = nextMemeReactionIds;

  await meme.save();
}
