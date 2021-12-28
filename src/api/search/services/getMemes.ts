import { DocumentType } from "@typegoose/typegoose";
import { MemeModel } from "../../../models";
import Meme from "../../memes/models/Meme";

export default async function getMemes(input: string): Promise<DocumentType<Meme>[]> {
  return await MemeModel.find({ $or: [{ text: { $regex: input, $options: "i" } }, { caption: { $regex: input, $options: "i" } }] });
}
