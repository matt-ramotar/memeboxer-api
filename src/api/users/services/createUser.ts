import { DocumentType } from "@typegoose/typegoose";
import { UserModel } from "../../../models";
import User from "../models/User";

export default async function createUser(name: string, username: string, email: string, googleId?: string, picture?: string): Promise<DocumentType<User>> {
  try {
    return await UserModel.create({ email, username, name, googleId, picture });
  } catch (error) {
    throw error;
  }
}
