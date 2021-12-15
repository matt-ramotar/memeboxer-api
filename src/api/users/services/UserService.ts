import { DocumentType } from "@typegoose/typegoose";
import User from "../models/User";
import createUser from "./createUser";
import getUser from "./getUser";

interface UserService {
  createUser(email: string, username: string, name: string, googleId?: string, picture?: string): Promise<DocumentType<User>>;
  getUser(userId: string): Promise<DocumentType<User> | null>;
}

export default class RealUserService implements UserService {
  public async createUser(email: string, username: string, name: string, googleId?: string, picture?: string): Promise<DocumentType<User>> {
    return await createUser(email, username, name, googleId, picture);
  }

  public async getUser(userId: string): Promise<DocumentType<User> | null> {
    return await getUser(userId);
  }
}
