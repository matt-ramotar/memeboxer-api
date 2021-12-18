import { RealMemeboxerError, UserNotFound } from "../../../errors";
import isIn from "../../../helpers/isIn";
import { UserModel } from "../../../models";

export default async function followUser(userId: string, userToFollowId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    const userToFollow = await UserModel.findById(userToFollowId);
    if (!userToFollow) throw new UserNotFound("User to follow not found");

    if (isIn(userToFollowId, user.usersFollowingIds)) throw new RealMemeboxerError("Already following user");

    if (user.usersFollowingIds) user.usersFollowingIds.push(userToFollowId);
    else user.usersFollowingIds = [userToFollowId];

    await user.save();
  } catch (error) {
    throw error;
  }
}
