import { DocumentType } from "@typegoose/typegoose";
import { ObjectAlreadyExists } from "../../../errors";
import { TagModel } from "../../../models";
import { CreateTagInput } from "../entities/CreateTagInput";
import Tag from "../models/Tag";

export default async function createTag(input: CreateTagInput): Promise<DocumentType<Tag>> {
  try {
    const { tag } = input;

    if (await TagModel.exists({ tag: tag })) {
      throw new ObjectAlreadyExists();
    }

    return await TagModel.create({ tag });
  } catch (error) {
    throw error;
  }
}
