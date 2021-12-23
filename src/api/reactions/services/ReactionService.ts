import { DocumentType } from "@typegoose/typegoose";
import { UpsertReactionInput } from "../entities/UpsertReactionInput";
import Reaction from "../models/Reaction";
import upsertReaction from "./upsertReaction";

interface ReactionService {
  upsertReaction(input: UpsertReactionInput): Promise<DocumentType<Reaction>>;
}

export default class RealReactionService implements ReactionService {
  public async upsertReaction(input: UpsertReactionInput): Promise<DocumentType<Reaction>> {
    return await upsertReaction(input);
  }
}
