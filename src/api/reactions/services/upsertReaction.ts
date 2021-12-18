import { ReactionModel } from "../../../models";
import { UpsertReactionInput } from "../entities/UpsertReactionInput";
import Reaction from "../models/Reaction";

export default async function upsertReaction(input: UpsertReactionInput): Promise<Reaction> {
  try {
    const { native, name, colons, skin, isCustom, imageUrl } = input;

    let reaction = await ReactionModel.findOne({ name });
    if (!reaction) reaction = await ReactionModel.create({ native, name, colons, skin, isCustom, imageUrl });

    return await reaction.toPojo();
  } catch (error) {
    throw error;
  }
}
