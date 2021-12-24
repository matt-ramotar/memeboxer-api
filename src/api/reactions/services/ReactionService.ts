import { DocumentType } from "@typegoose/typegoose";
import { UpsertReactionInput } from "../entities/UpsertReactionInput";
import Reaction from "../models/Reaction";
import getReaction from "./getReaction";
import upsertReaction from "./upsertReaction";

interface ReactionService {
  upsertReaction(input: UpsertReactionInput): Promise<DocumentType<Reaction>>;
  getReaction(reactionId: string): Promise<DocumentType<Reaction> | null>;
}

export default class RealReactionService implements ReactionService {
  public async upsertReaction(input: UpsertReactionInput): Promise<DocumentType<Reaction>> {
    return await upsertReaction(input);
  }

  public async getReaction(reactionId: string): Promise<DocumentType<Reaction> | null> {
    return await getReaction(reactionId);
  }
}
