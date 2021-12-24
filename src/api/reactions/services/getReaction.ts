import { DocumentType } from "@typegoose/typegoose";
import { ReactionModel } from "../../../models";
import Reaction from "../models/Reaction";

export default async function getReaction(reactionId: string): Promise<DocumentType<Reaction> | null> {
  return await ReactionModel.findById(reactionId);
}
