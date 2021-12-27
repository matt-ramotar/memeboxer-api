import { Controller, Path, Put, Route, Tags } from "tsoa";
import { NotificationModel } from "../../../models";

@Route("notifications")
@Tags("Notification")
export class NotificationController extends Controller {
  /** Mark comment read */
  @Put("{notificationId}/read")
  async markCommentRead(@Path() notificationId: string): Promise<void> {
    try {
      const notification = await NotificationModel.findById(notificationId);
      if (!notification) throw new Error();

      notification.isRead = true;
      await notification.save();
    } catch (error) {
      throw error;
    }
  }

  /** Mark comment unread */
  @Put("{notificationId}/unread")
  async markCommentUnread(@Path() notificationId: string): Promise<void> {
    try {
      const notification = await NotificationModel.findById(notificationId);
      if (!notification) throw new Error();

      notification.isRead = false;
      await notification.save();
    } catch (error) {
      throw error;
    }
  }
}
