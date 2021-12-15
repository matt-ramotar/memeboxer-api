import { getModelForClass } from "@typegoose/typegoose";
import User from "./api/users/models/User";

export const UserModel = getModelForClass(User);
