import { MemeModel } from "../../../models";
import { GodMeme } from "../models/GodMeme";

export default async function getBestMemes(keyword?: string, title?: string, user?: string, tags?: string[]): Promise<GodMeme[]> {
  console.log(`${keyword}, ${title}, ${user}, ${tags}`);

  const memes = await MemeModel.find();
  const godMemes = [];
  for (const meme of memes) {
    godMemes.push(await meme.toGodMeme());
  }
  return godMemes;
}
