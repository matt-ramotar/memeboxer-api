import { DocumentType } from "@typegoose/typegoose";
import { Controller, Get, Path, Put, Route, Tags } from "tsoa";
import isIn from "../../../helpers/isIn";
import Action from "../../actions/models/Action";
import { ActionType } from "../../actions/models/ActionType";
import { GodAction } from "../../actions/models/GodAction";
import RealActionService from "../../actions/services/ActionService";
import Notification from "../../notifications/models/Notification";
import RealNotificationService from "../../notifications/services/NotificationService";
import { UserActivity } from "../entities/UserActivity";
import { GodUser } from "../models/GodUser";
import User from "../models/User";
import RealUserService from "../services/UserService";

@Route("users")
@Tags("User")
export class UserController extends Controller {
  /** Get user by ID */
  @Get("{userId}")
  async getUser(@Path() userId: string): Promise<User | null> {
    try {
      if (!userId) throw new Error();

      const user = await new RealUserService().getUser(userId);
      if (!user) throw new Error();

      return user.toPojo();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /** Get god user by ID */
  @Get("{userId}/god")
  async getGodUser(@Path() userId: string): Promise<GodUser | null> {
    try {
      if (!userId) throw new Error();

      const user = await new RealUserService().getUser(userId);
      if (!user) throw new Error();

      return await user.toGodUser();
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

          return dateA > dateB ? -1 : 1;
        });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /** Get user reaction activity */
  @Get("{username}/activity")
  async getUserActivity(@Path() username: string): Promise<UserActivity> {
    try {
      const userService = new RealUserService();

      const user = await userService.getUser(username);
      if (!user) throw new Error();

      await user.populate("actionIds").execPopulate();

      const comments: GodAction[] = [];
      const reactions: GodAction[] = [];

      for (const action of user.actionIds as unknown as DocumentType<Action>[]) {
        if (action.type == ActionType.AddCommentToComment || action.type == ActionType.AddCommentToMeme) {
          console.log("action", action);
          const godAction = await action.toGodAction();
          console.log("god action", godAction);
          comments.push(godAction);
        } else if (action.type == ActionType.ReactToComment || action.type == ActionType.ReactToMeme) {
          reactions.push(await action.toGodAction());
        }
      }

      return {
        comments,
        reactions
      };
    } catch (error) {
      return {
        comments: [],
        reactions: []
      };
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

  /** Follow user */
  @Put("{userId}/followers/{otherUserId}/follow")
  async followUser(@Path() userId: string, @Path() otherUserId: string): Promise<User | null> {
    try {
      const userService = new RealUserService();
      const actionService = new RealActionService();
      const notificationService = new RealNotificationService();

      const user = await userService.getUser(userId);
      const otherUser = await userService.getUser(otherUserId);

      if (!user || !otherUser) throw new Error();
      if (isIn(otherUserId, user?.usersFollowedByIds)) throw new Error();
      if (isIn(userId, otherUser?.usersFollowingIds)) throw new Error();

      if (user.usersFollowedByIds) user.usersFollowedByIds.push(otherUserId);
      else user.usersFollowedByIds = [otherUserId];
      await user.save();

      if (otherUser.usersFollowingIds) otherUser.usersFollowingIds.push(userId);
      else otherUser.usersFollowingIds = [userId];
      await otherUser.save();

      const action = await actionService.createAction({
        type: ActionType.FollowUser,
        userId: otherUserId,
        otherUserId: userId
      });

      await userService.addAction(action._id, otherUserId);
      await userService.publishAction(action._id, otherUserId);

      const notification = await notificationService.createNotification(userId, action._id);
      await userService.addNotification(userId, notification._id);

      return user;
    } catch (error) {
      return null;
    }
  }

  /** Follow user */
  @Put("{userId}/followers/{otherUserId}/unfollow")
  async unfollowUser(@Path() userId: string, @Path() otherUserId: string): Promise<User | null> {
    try {
      const userService = new RealUserService();

      const user = await userService.getUser(userId);
      const otherUser = await userService.getUser(otherUserId);

      if (!user || !otherUser || !user.usersFollowedByIds || !otherUser.usersFollowingIds) throw new Error();

      user.usersFollowedByIds = user.usersFollowedByIds.filter((id) => id != otherUserId);
      await user.save();

      otherUser.usersFollowingIds = otherUser.usersFollowingIds.filter((id) => id != userId);
      await otherUser.save();

      return user;
    } catch (error) {
      return null;
    }
  }
}
