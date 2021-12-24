import { MemeNotFound, MemeViewNotFound } from "../../../errors";
import { MemeModel, MemeViewModel } from "../../../models";

export default async function addMemeView(memeId: string, memeViewId: string): Promise<void> {
  try {
    const meme = await MemeModel.findById(memeId);
    if (!meme) throw new MemeNotFound();

    const memeView = await MemeViewModel.findById(memeViewId);
    if (!memeView) throw new MemeViewNotFound();

    if (meme.memeViewIds) meme.memeViewIds.push(memeViewId);
    else meme.memeViewIds = [memeViewId];

    await meme.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
