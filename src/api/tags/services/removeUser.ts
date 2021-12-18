import { TagNotFound, UserNotFound } from "../../../errors";
import { TagModel, UserModel } from "../../../models";

export default async function removeUser(tagId: string, userId: string): Promise<void> {
  try {
    const tag = await TagModel.findById(tagId);
    if (!tag) throw new TagNotFound();

    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    if (!tag.userIds) throw new Error("No followers found");

    tag.userIds = tag.userIds.filter((followerId: string) => followerId !== userId);

    await tag.save();
  } catch (error) {
    throw error;
  }
}
