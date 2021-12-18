import { DocumentType } from "@typegoose/typegoose";
import { Feed } from "../../actions/models/Feed";
import { GodUser } from "../models/GodUser";
import User from "../models/User";
import addAction from "./addAction";
import addComment from "./addComment";
import addCommentReaction from "./addCommentReaction";
import addFollower from "./addFollower";
import createUser from "./createUser";
import followTag from "./followTag";
import followUser from "./followUser";
import getFeed from "./getFeed";
import getGodUserById from "./getGodUserById";
import getGodUserByUsername from "./getGodUserByUsername";
import getUser from "./getUser";
import getUsers from "./getUsers";
import publishAction from "./publishAction";
import removeFollower from "./removeFollower";
import unfollowTag from "./unfollowTag";
import unfollowUser from "./unfollowUser";

interface UserService {
  getUser(userId: string): Promise<User | null>;
  followUser(userId: string, userToFollowId: string): Promise<void>;
  addFollower(userId: string, followerId: string): Promise<void>;
  unfollowUser(userId: string, userToUnfollowId: string): Promise<void>;
  removeFollower(userId: string, followerId: string): Promise<void>;
  addAction(actionId: string, userId: string): Promise<void>;
  publishAction(userId: string, actionId: string): Promise<void>;
  followTag(userId: string, tagId: string): Promise<void>;
  unfollowTag(userId: string, tagId: string): Promise<void>;
  addComment(userId: string, commentId: string): Promise<void>;
  addCommentReaction(userId: string, commentReactionId: string): Promise<void>;
  getFeed(userId: string, type: string, offset: number): Promise<Feed>;
  getGodUserById(userId: string): Promise<GodUser>;
  getGodUserByUsername(username: string): Promise<GodUser>;
  getUsers(): Promise<GodUser[]>;
  createUser(firstName: string, lastName: string, username: string, email: string, googleId?: string, picture?: string): Promise<DocumentType<User>>;
}

export default class RealUserService implements UserService {
  public async getUser(userId: string): Promise<User | null> {
    return await getUser(userId);
  }

  public async followUser(userId: string, userToFollowId: string): Promise<void> {
    return await followUser(userId, userToFollowId);
  }

  public async addFollower(userId: string, followerId: string): Promise<void> {
    return await addFollower(userId, followerId);
  }

  public async unfollowUser(userId: string, userToUnfollowId: string): Promise<void> {
    return await unfollowUser(userId, userToUnfollowId);
  }

  public async removeFollower(userId: string, followerId: string): Promise<void> {
    return await removeFollower(userId, followerId);
  }

  public async addAction(actionId: string, userId: string): Promise<void> {
    return await addAction(actionId, userId);
  }

  public async publishAction(actionId: string, userId: string): Promise<void> {
    return await publishAction(actionId, userId);
  }

  public async followTag(userId: string, tagId: string): Promise<void> {
    return await followTag(userId, tagId);
  }

  public async unfollowTag(userId: string, tagId: string): Promise<void> {
    return await unfollowTag(userId, tagId);
  }

  public async addComment(userId: string, commentId: string): Promise<void> {
    return await addComment(userId, commentId);
  }

  public async addCommentReaction(userId: string, commentReactionId: string): Promise<void> {
    return await addCommentReaction(userId, commentReactionId);
  }

  public async getFeed(userId: string, type: string, offset: number): Promise<Feed> {
    return await getFeed(userId, type, offset);
  }

  public async getGodUserById(userId: string): Promise<GodUser> {
    return await getGodUserById(userId);
  }

  public async getGodUserByUsername(username: string): Promise<GodUser> {
    return await getGodUserByUsername(username);
  }

  public async getUsers(): Promise<GodUser[]> {
    return await getUsers();
  }

  public async createUser(name: string, username: string, email: string, googleId?: string, picture?: string): Promise<DocumentType<User>> {
    return await createUser(username, email, name, googleId, picture);
  }
}
