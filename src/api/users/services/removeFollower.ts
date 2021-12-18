import { UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";

export default async function removeFollower(userId: string, followerId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    const follower = await UserModel.findById(followerId);
    if (!follower) throw new UserNotFound("Follower not found");

    if (!user.usersFollowedByIds) throw new Error("No followers found");

    user.usersFollowedByIds = (user.usersFollowedByIds as string[]).filter((followerId: string) => followerId !== follower.id);
    await user.save();
  } catch (error) {
    throw error;
  }
}
