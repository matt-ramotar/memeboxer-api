import { TagNotFound } from "../../../errors";
import { TagModel } from "../../../models";

export default async function removeMeme(memeId: string, tagId: string): Promise<void> {
  try {
    const tag = await TagModel.findById(tagId);
    if (!tag || !tag.memeIds) throw new TagNotFound();

    tag.memeIds = tag.memeIds.filter((id) => id != memeId);

    await tag.save();
  } catch (error) {
    throw error;
  }
}
