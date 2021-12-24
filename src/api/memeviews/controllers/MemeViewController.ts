import { Body, Controller, Post, Route, Tags } from "tsoa";
import { RealMemeboxerError } from "../../../errors";
import RealMemeService from "../../memes/services/MemeService";
import RealUserService from "../../users/services/UserService";
import { CreateMemeViewInput } from "../entities/CreateMemeViewInput";
import MemeView from "../models/MemeView";
import RealMemeViewService from "../services/MemeViewService";

@Route("memeviews")
@Tags("MemeView")
export class MemeViewController extends Controller {
  /** Create meme view */
  @Post()
  async createMemeView(@Body() input: CreateMemeViewInput): Promise<MemeView | null> {
    try {
      const memeViewService = new RealMemeViewService();
      const memeService = new RealMemeService();
      const userService = new RealUserService();

      const memeView = await memeViewService.createMemeView(input);
      if (!memeView) throw new RealMemeboxerError("Meme view not created.");

      await memeService.addMemeView(input.memeId, memeView._id);

      await userService.addMemeView(input.userId, memeView._id);

      return memeView;
    } catch (error) {
      console.log("failing");
      console.log(error);
      return null;
    }
  }
}
