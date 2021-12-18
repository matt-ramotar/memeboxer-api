import { GodMeme } from "../models/GodMeme";
import getBestMemes from "./getBestMemes";

interface MemeService {
  getBestMemes(keyword?: string, title?: string, user?: string, tags?: string[]): Promise<GodMeme[]>;
}

export default class RealMemeService implements MemeService {
  public async getBestMemes(keyword?: string, title?: string, user?: string, tags?: string[]): Promise<GodMeme[]> {
    return await getBestMemes(keyword, title, user, tags);
  }
}
