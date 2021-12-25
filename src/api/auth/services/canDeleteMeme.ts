import jwt from "jsonwebtoken";
import { MemeModel, UserModel } from "../../../models";
import { KEYS } from "../../../util/secrets";
import { AuthToken } from "../entities/tokens";

export default async function canDeleteMeme(userId: string, memeId: string, token: string): Promise<boolean> {
  const meme = await MemeModel.findById(memeId);
  const user = await UserModel.findById(userId);
  const decoded = jwt.verify(token, KEYS!) as AuthToken;

  return Boolean(meme && user && user._id == decoded.userId && meme.userId == decoded.userId);
}
