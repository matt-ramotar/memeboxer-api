import { NotificationNotFound, UserNotFound } from "../../../errors";
import { NotificationModel, UserModel } from "../../../models";

export default async function addNotification(userId: string, notificationId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    const notification = await NotificationModel.findById(notificationId);
    if (!notification) throw new NotificationNotFound();

    if (user.notificationIds) user.notificationIds.push(notificationId);
    else user.notificationIds = [notificationId];

    await user.save();
  } catch (error) {
    throw error;
  }
}
