import { DocumentType } from "@typegoose/typegoose";
import { MemeReactionModel } from "../../../models";
import MemeReaction from "../models/MemeReaction";

export default async function createMemeReaction(memeId: string, userId: string, reactionId: string): Promise<DocumentType<MemeReaction>> {
  try {
    return await MemeReactionModel.create({
      memeId,
      userId,
      reactionId
    });
  } catch (error) {
    throw error;
  }
}
