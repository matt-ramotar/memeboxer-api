import { DocumentType } from "@typegoose/typegoose";
import { Controller, Get, Path, Route, Tags } from "tsoa";
import Notification from "../../notifications/models/Notification";
import User from "../models/User";
import RealUserService from "../services/UserService";

@Route("users")
@Tags("User")
export class UserController extends Controller {
  /** Get user by ID */
  @Get("{userId}")
  async getUser(@Path() userId: string): Promise<User | null> {
    try {
      const user = await new RealUserService().getUser(userId);
      if (!user) throw new Error();

      return user.toPojo();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /** Get user notifications */
  @Get("{userId}/notifications")
  async getUserNotifications(@Path() userId: string): Promise<Notification[] | null> {
    try {
      console.log(userId);
      const user = await new RealUserService().getUser(userId);
      if (!user) throw new Error();

      await user.populate("notificationIds").execPopulate();

      return (user.notificationIds as unknown as DocumentType<Notification>[])
        .map((notification) => notification.toPojo())
        .sort((a, b) => {
          const dateA = new Date(a.created);
          const dateB = new Date(b.created);

          return dateA > dateB ? 1 : -1;
        });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /** Get user unread notifications */
  @Get("{userId}/notifications/unread")
  async getUserUnreadNotifications(@Path() userId: string): Promise<Notification[] | null> {
    try {
      const user = await new RealUserService().getUser(userId);
      if (!user) throw new Error();

      await user.populate("notificationIds").execPopulate();

      const unreadNotifications = (user.notificationIds as unknown as DocumentType<Notification>[])
        .filter((notification) => !notification.isRead)
        .map((notification) => notification.toPojo());

      return unreadNotifications;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
