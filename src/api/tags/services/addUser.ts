import { RelationshipAlreadyExists, TagNotFound, UserNotFound } from "../../../errors";
import isIn from "../../../helpers/isIn";
import { TagModel, UserModel } from "../../../models";

export default async function addUser(tagId: string, userId: string): Promise<void> {
  try {
    const tag = await TagModel.findById(tagId);
    if (!tag) throw new TagNotFound();

    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    if (isIn(userId, tag.userIds)) throw new RelationshipAlreadyExists();

    if (tag.userIds) tag.userIds.push(userId);
    else tag.userIds = [userId];

    await tag.save();
  } catch (error) {
    throw error;
  }
}
