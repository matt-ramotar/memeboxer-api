import { DocumentType } from "@typegoose/typegoose";
import { MemeModel } from "../../../models";
import { CreateMemeInput } from "../entities/CreateMemeInput";
import Meme from "../models/Meme";

export default async function createMeme(input: CreateMemeInput): Promise<DocumentType<Meme>> {
  return await MemeModel.create(input);
}
