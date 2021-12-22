import { MemeModel } from "../../../models";
import { GodMeme } from "../models/GodMeme";

export default async function getMemes(): Promise<GodMeme[]> {
  const memes = await MemeModel.find();
  const godMemes = [];

  for (const meme of memes) {
    console.log(meme);
    godMemes.push(await meme.toGodMeme());
    console.log(godMemes);
  }

  return godMemes;
}
