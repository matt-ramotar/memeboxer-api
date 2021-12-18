import { TagNotFound, UserNotFound } from "../../../errors";
import { TagModel, UserModel } from "../../../models";

export default async function followTag(userId: string, tagId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    const tag = await TagModel.findById(tagId);
    if (!tag) throw new TagNotFound();

    if (user.tagsFollowingIds) user.tagsFollowingIds.push(tagId);
    else user.tagsFollowingIds = [tagId];

    await user.save();
  } catch (error) {
    throw error;
  }
}
