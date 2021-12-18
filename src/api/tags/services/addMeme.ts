import { RelationshipAlreadyExists, TagNotFound } from "../../../errors";
import isIn from "../../../helpers/isIn";
import { TagModel } from "../../../models";

export default async function addMeme(memeId: string, tagId: string): Promise<void> {
  try {
    const tag = await TagModel.findById(tagId);
    if (!tag) throw new TagNotFound();

    if (isIn(memeId, tag.memeIds)) throw new RelationshipAlreadyExists();

    if (tag.memeIds) tag.memeIds.push(memeId);
    else tag.memeIds = [memeId];

    await tag.save();
  } catch (error) {
    throw error;
  }
}
