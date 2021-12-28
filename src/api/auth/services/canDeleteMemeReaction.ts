import jwt from "jsonwebtoken";
import { MemeReactionModel, UserModel } from "../../../models";
import { KEYS } from "../../../util/secrets";
import { AuthToken } from "../entities/tokens";

export default async function canDeleteMemeReaction(userId: string, memeReactionId: string, token: string): Promise<boolean> {
  const memeReaction = await MemeReactionModel.findById(memeReactionId);
  const user = await UserModel.findById(userId);
  const decoded = jwt.verify(token, KEYS!) as AuthToken;

  return Boolean(memeReaction && user && user._id == decoded.userId && memeReaction.userId == decoded.userId);
}
