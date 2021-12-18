import { UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";

export default async function addFollower(userId: string, followerId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    const follower = await UserModel.findById(followerId);
    if (!follower) throw new UserNotFound("Follower not found");

    if (user.usersFollowedByIds) user.usersFollowedByIds.push(followerId);
    else user.usersFollowedByIds = [followerId];

    await user.save();
  } catch (error) {
    throw error;
  }
}
