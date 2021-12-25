import { MemeModel } from "../../../models";
import Meme from "../models/Meme";

export default async function deleteMeme(memeId: string): Promise<Meme | null> {
  return await MemeModel.findByIdAndDelete(memeId);
}
