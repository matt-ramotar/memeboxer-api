import { DocumentType } from "@typegoose/typegoose";
import { UserModel } from "../../../models";
import User from "../models/User";

export default async function getUser(userId: string): Promise<DocumentType<User> | null> {
  try {
    return await UserModel.findById(userId);
  } catch (error) {
    throw error;
  }
}
