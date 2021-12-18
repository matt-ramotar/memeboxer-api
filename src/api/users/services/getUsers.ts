import { UserModel } from "../../../models";
import { GodUser } from "../models/GodUser";

export default async function getUsers(): Promise<GodUser[]> {
  try {
    const godUsers = [];
    const users = await UserModel.find();
    for (const user of users) {
      godUsers.push(await user.toGodUser());
    }
    return godUsers;
  } catch (error) {
    throw error;
  }
}
