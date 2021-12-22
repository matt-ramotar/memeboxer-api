import { DocumentType } from "@typegoose/typegoose";
import { CreateMemeInput } from "../entities/CreateMemeInput";
import { GodMeme } from "../models/GodMeme";
import Meme from "../models/Meme";
import createMeme from "./createMeme";
import getBestMemes from "./getBestMemes";
import getMeme from "./getMeme";
import getMemes from "./getMemes";

interface MemeService {
  getBestMemes(keyword?: string, title?: string, user?: string, tags?: string[]): Promise<GodMeme[]>;
  getMeme(id: string): Promise<GodMeme | null>;
  getMemes(): Promise<GodMeme[]>;
  createMeme(input: CreateMemeInput): Promise<DocumentType<Meme>>;
}

export default class RealMemeService implements MemeService {
  public async getBestMemes(keyword?: string, title?: string, user?: string, tags?: string[]): Promise<GodMeme[]> {
    return await getBestMemes(keyword, title, user, tags);
  }

  public async getMemes(): Promise<GodMeme[]> {
    return await getMemes();
  }

  public async getMeme(memeId: string): Promise<GodMeme | null> {
    return await getMeme(memeId);
  }

  public async createMeme(input: CreateMemeInput): Promise<DocumentType<Meme>> {
    return await createMeme(input);
  }
}
