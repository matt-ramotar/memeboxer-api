import { UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";
import { GodUser } from "../models/GodUser";

export default async function getGodUserById(userId: string): Promise<GodUser> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();
    return await user.toGodUser();
  } catch (error) {
    throw error;
  }
}
