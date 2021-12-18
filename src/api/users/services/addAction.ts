import { UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";

export default async function addAction(actionId: string, userId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    if (user.actionIds) user.actionIds.push(actionId);
    else user.actionIds = [actionId];
    await user.save();
  } catch (error) {
    throw error;
  }
}
