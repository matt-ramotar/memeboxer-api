import { MemeModel } from "../../../models";
import { GodMeme } from "../models/GodMeme";

export default async function getMeme(memeId: string): Promise<GodMeme | null> {
  const meme = await MemeModel.findById(memeId);

  if (meme) {
    return await meme.toGodMeme();
  }
  return null;
}
