import { DocumentType } from "@typegoose/typegoose";
import { MemeTagModel } from "../../../models";
import { CreateMemeTagInput } from "../entities/CreateMemeTagInput";
import MemeTag from "../models/MemeTag";

export default async function createMemeTag(input: CreateMemeTagInput): Promise<DocumentType<MemeTag>> {
  return await MemeTagModel.create(input);
}
