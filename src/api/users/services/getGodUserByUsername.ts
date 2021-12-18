import { UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";
import { GodUser } from "../models/GodUser";

export default async function getGodUserByUsername(username: string): Promise<GodUser> {
  try {
    const user = await UserModel.findOne({ username });
    if (!user) throw new UserNotFound();

    return await user.toGodUser();
  } catch (error) {
    throw error;
  }
}
