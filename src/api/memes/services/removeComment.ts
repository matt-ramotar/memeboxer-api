import { MemeModel } from "../../../models";

export default async function removeComment(commentId: string, memeId: string): Promise<void> {
  const meme = await MemeModel.findById(memeId);

  if (!meme || !meme.commentIds) return;

  meme.commentIds = meme.commentIds.filter((id) => id != commentId);

  await meme.save();
}
