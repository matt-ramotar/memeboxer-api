import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import { RealMemeboxerError } from "../../../errors";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealStorageService from "../../storage/services/StorageService";
import RealTagService from "../../tags/services/TagService";
import RealUserService from "../../users/services/UserService";
import { CreateMemeInput } from "../entities/CreateMemeInput";
import { GodMeme } from "../models/GodMeme";
import Meme from "../models/Meme";
import RealMemeService from "../services/MemeService";

@Route("memes")
@Tags("Meme")
export class MemeController extends Controller {
  /** Get meme by ID */
  @Get("{memeId}")
  async getMeme(@Path() memeId: string): Promise<GodMeme | null> {
    return await new RealMemeService().getMeme(memeId);
  }

  /** Create meme */
  @Post()
  async createMeme(@Body() input: CreateMemeInput): Promise<Meme | null> {
    try {
      console.log("$INPUT", input);
      const memeService = new RealMemeService();
      const storageService = new RealStorageService();
      const tagService = new RealTagService();
      const userService = new RealUserService();
      const actionService = new RealActionService();

      const tagIds: string[] = [];
      if (input.tags && input.tags.length > 0) {
        for (const tag of input.tags) {
          const realTag = await tagService.createTag({ tag });
          tagIds.push(realTag._id);
        }
      }

      const memeInput = { ...input, tagIds };
      const meme = await memeService.createMeme(memeInput);
      const uploadedToS3 = await storageService.uploadMeme(meme._id, input.templateId, input.data);

      if (!uploadedToS3) throw new RealMemeboxerError("Upload failed.");

      await userService.addMeme(meme._id, input.userId);

      for (const tagId of tagIds) {
        await tagService.addMeme(meme._id, tagId);
      }

      const action = await actionService.createAction({
        type: ActionType.CreateMeme,
        userId: input.userId,
        memeId: meme._id
      });

      await userService.addAction(action._id, input.userId);
      await userService.publishAction(action._id, input.userId);

      return meme.toPojo();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
