import { DocumentType } from "@typegoose/typegoose";
import { MemeViewModel } from "../../../models";
import { CreateMemeViewInput } from "../entities/CreateMemeViewInput";
import MemeView from "../models/MemeView";

export default async function createMemeView(input: CreateMemeViewInput): Promise<DocumentType<MemeView>> {
  return await MemeViewModel.create({ ...input, datetime: new Date() });
}
