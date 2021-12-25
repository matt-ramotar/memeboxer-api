import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from "tsoa";
import { MemeNotFound, RealMemeboxerError } from "../../../errors";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealAuthService from "../../auth/services/AuthService";
import RealMemeReactionService from "../../memereactions/services/MemeReactionService";
import RealNotificationService from "../../notifications/services/NotificationService";
import RealStorageService from "../../storage/services/StorageService";
import RealTagService from "../../tags/services/TagService";
import RealTemplateService from "../../templates/services/TemplateService";
import RealUserService from "../../users/services/UserService";
import { AddReactionInput } from "../entities/AddReactionInput";
import { CreateMemeInput } from "../entities/CreateMemeInput";
import { DeleteMemeInput } from "../entities/DeleteMemeInput";
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

  /** Get memes */
  @Get()
  async getMemes(): Promise<GodMeme[]> {
    return await new RealMemeService().getMemes();
  }

  /** Create meme */
  @Post()
  async createMeme(@Body() input: CreateMemeInput): Promise<Meme | null> {
    try {
      const memeService = new RealMemeService();
      const storageService = new RealStorageService();
      const tagService = new RealTagService();
      const userService = new RealUserService();
      const templateService = new RealTemplateService();
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
      await templateService.addMeme(meme._id, input.templateId);

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

  /** Delete meme */
  @Delete("{memeId}")
  async deleteMeme(@Path() memeId: string, @Body() input: DeleteMemeInput): Promise<Meme | null> {
    try {
      const authService = new RealAuthService();
      const memeService = new RealMemeService();
      const userService = new RealUserService();
      const templateService = new RealTemplateService();
      const tagService = new RealTagService();

      const canDeleteMeme = await authService.canDeleteMeme(input.userId, memeId, input.token);
      if (!canDeleteMeme) throw new Error();

      const meme = await memeService.deleteMeme(memeId);
      if (!meme) throw new Error();

      await userService.removeMeme(memeId, input.userId);
      await templateService.removeMeme(memeId, meme.templateId);

      if (meme.tagIds) {
        for (const tagId of meme.tagIds) {
          await tagService.removeMeme(memeId, tagId);
        }
      }

      return meme;
    } catch (error) {
      return null;
    }
  }

  /** Add reaction */
  @Post("{memeId}/reactions")
  async addMemeReaction(@Path() memeId: string, @Body() input: AddReactionInput): Promise<GodMeme | null> {
    try {
      const memeReactionService = new RealMemeReactionService();
      const memeService = new RealMemeService();
      const actionService = new RealActionService();
      const userService = new RealUserService();
      const notificationService = new RealNotificationService();

      const meme = await memeService.getMeme(memeId);
      if (!meme) throw new MemeNotFound();

      const otherUserId = meme.user.id;

      const memeReaction = await memeReactionService.createMemeReaction(memeId, input.userId, input.reactionId);

      await memeService.addMemeReaction(memeId, memeReaction._id);
      await userService.addMemeReaction(input.userId, memeReaction._id);

      const action = await actionService.createAction({
        type: ActionType.ReactToMeme,
        userId: input.userId,
        memeId,
        memeReactionId: memeReaction._id
      });

      await userService.addAction(action._id, input.userId);
      await userService.publishAction(action._id, input.userId);

      const notification = await notificationService.createNotification(input.userId, action._id);

      await userService.addNotification(otherUserId, notification._id);

      return meme;
    } catch (error) {
      return null;
    }
  }
}
