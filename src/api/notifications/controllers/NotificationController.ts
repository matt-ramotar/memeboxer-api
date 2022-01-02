import { Controller, Path, Put, Route, Tags } from "tsoa";
import RealNotificationService from "../services/NotificationService";

@Route("notifications")
@Tags("Notification")
export class NotificationController extends Controller {
  /** Mark notification read */
  @Put("{notificationId}/read")
  async markNotificationRead(@Path() notificationId: string): Promise<void> {
    const notificationService = new RealNotificationService();

    await notificationService.markNotificationRead(notificationId);
  }

  /** Mark comment unread */
  @Put("{notificationId}/unread")
  async markNotificationUnread(@Path() notificationId: string): Promise<void> {
    const notificationService = new RealNotificationService();

    await notificationService.markNotificationUnread(notificationId);
  }
}
