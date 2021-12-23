import { DocumentType } from "@typegoose/typegoose";
import MemeReaction from "../models/MemeReaction";
import createMemeReaction from "./createMemeReaction";

interface MemeReactionService {
  createMemeReaction(memeId: string, userId: string, reactionId: string): Promise<DocumentType<MemeReaction>>;
}

export default class RealMemeReactionService implements MemeReactionService {
  public async createMemeReaction(memeId: string, userId: string, reactionId: string): Promise<DocumentType<MemeReaction>> {
    return await createMemeReaction(memeId, userId, reactionId);
  }
}
