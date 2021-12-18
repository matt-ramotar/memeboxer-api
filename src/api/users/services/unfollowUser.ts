import { UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";

export default async function unfollowUser(userId: string, userToUnfollowId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    const userToUnfollow = await UserModel.findById(userToUnfollowId);
    if (!userToUnfollow) throw new UserNotFound("User to unfollow not found");

    if (!user.usersFollowingIds) throw new Error("User not following any users");

    user.usersFollowingIds = (user.usersFollowingIds as string[]).filter(
      (userFollowingId: string) => userFollowingId !== userToUnfollow.id
    );
    await user.save();
  } catch (error) {
    throw error;
  }
}
