import { MemeReactionModel } from "../../../models";
import MemeReaction from "../models/MemeReaction";

export default async function createMemeReaction(memeId: string, userId: string, reactionId: string): Promise<MemeReaction> {
  try {
    const memeReaction = await MemeReactionModel.create({
      memeId,
      userId,
      reactionId
    });

    return await memeReaction.toPojo();
  } catch (error) {
    throw error;
  }
}
