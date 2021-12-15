import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../../models";
import { KEYS } from "../../../util/secrets";
import RealUserService from "../../users/services/UserService";
import { ContinueWithGoogleSuccess } from "../entities/responses";

export default async function continueWithGoogle(request: Request, response: Response, _: NextFunction): Promise<Response<ContinueWithGoogleSuccess>> {
  const { email, username, name, googleId, picture } = request.body;

  const userService = new RealUserService();

  let user = await UserModel.findOne({ username });

  if (!user) {
    user = await userService.createUser(email, username, name, googleId, picture);
  }

  user.isLoggedIn = true;
  await user.save();

  const token = jwt.sign({ userId: user._id }, KEYS!);

  return response.json(new ContinueWithGoogleSuccess(user, token));
}
