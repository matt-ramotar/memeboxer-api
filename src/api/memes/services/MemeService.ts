import { DocumentType } from "@typegoose/typegoose";
import { CreateMemeInput } from "../entities/CreateMemeInput";
import { GodMeme } from "../models/GodMeme";
import Meme from "../models/Meme";
import addComment from "./addComment";
import addMemeReaction from "./addMemeReaction";
import addMemeView from "./addMemeView";
import createMeme from "./createMeme";
import deleteMeme from "./deleteMeme";
import getBestMemes from "./getBestMemes";
import getMeme from "./getMeme";
import getMemes from "./getMemes";
import removeComment from "./removeComment";

interface MemeService {
  getBestMemes(keyword?: string, title?: string, user?: string, tags?: string[]): Promise<GodMeme[]>;
  getMeme(id: string): Promise<GodMeme | null>;
  getMemes(): Promise<GodMeme[]>;
  createMeme(input: CreateMemeInput): Promise<DocumentType<Meme>>;
  addMemeReaction(memeId: string, memeReactionId: string): Promise<void>;
  addMemeView(memeId: string, memeViewId: string): Promise<void>;
  deleteMeme(memeId: string): Promise<Meme | null>;
  addComment(memeId: string, commentId: string): Promise<void>;
  removeComment(commentId: string, memeId: string): Promise<void>;
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

  public async addMemeReaction(memeId: string, memeReactionId: string): Promise<void> {
    return await addMemeReaction(memeId, memeReactionId);
  }

  public async addMemeView(memeId: string, memeViewId: string): Promise<void> {
    return await addMemeView(memeId, memeViewId);
  }

  public async deleteMeme(memeId: string): Promise<Meme | null> {
    return await deleteMeme(memeId);
  }

  public async addComment(memeId: string, commentId: string): Promise<void> {
    return await addComment(memeId, commentId);
  }

  public async removeComment(commentId: string, memeId: string): Promise<void> {
    return await removeComment(commentId, memeId);
  }
}
