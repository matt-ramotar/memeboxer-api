import { ObjectAlreadyExists } from "../../../errors";
import { TagModel } from "../../../models";
import { CreateTagInput } from "../entities/CreateTagInput";
import Tag from "../models/Tag";

export default async function createTag(input: CreateTagInput): Promise<Tag> {
  try {
    const { tag } = input;

    if (await TagModel.exists({ tag: tag })) {
      throw new ObjectAlreadyExists();
    }

    const tagObject = await TagModel.create({ tag });
    return await tagObject.toPojo();
  } catch (error) {
    throw error;
  }
}
