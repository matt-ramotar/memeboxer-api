import { DocumentType } from "@typegoose/typegoose";
import { UserModel } from "../../../models";
import User from "../models/User";

export default async function getUser(userId: string): Promise<DocumentType<User> | null> {
  try {
    let user = await UserModel.findOne({ username: userId });

    if (!user) {
      user = await UserModel.findById(userId);
    }

    return user;
  } catch (error) {
    throw error;
  }
}
