import { DocumentType } from "@typegoose/typegoose";
import { TagModel } from "../../../models";
import Tag from "../../tags/models/Tag";

export default async function getTags(input: string): Promise<DocumentType<Tag>[]> {
  return await TagModel.find({ tag: { $regex: input, $options: "i" } });
}
