import { Controller, Get, Path, Route, Tags } from "tsoa";
import User from "../models/User";
import RealUserService from "../services/UserService";

@Route("users")
@Tags("User")
export class UserController extends Controller {
  /** Get user by ID */
  @Get("{userId}")
  async getUser(@Path() userId: string): Promise<User | null> {
    return await new RealUserService().getUser(userId);
  }
}
