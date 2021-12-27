import { DocumentType } from "@typegoose/typegoose";
import { UserModel } from "../../../models";
import User from "../../users/models/User";

export default async function getUsers(input: string): Promise<DocumentType<User>[]> {
  return await UserModel.find({ $or: [{ username: { $regex: input, $options: "i" } }, { name: { $regex: input, $options: "i" } }] });
}
