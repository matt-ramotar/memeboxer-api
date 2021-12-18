import { Body, Controller, Post, Route, Tags } from "tsoa";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealReactionService from "../../reactions/services/ReactionService";
import RealUserService from "../../users/services/UserService";
import { CreateMemeReactionInput } from "../entities/CreateMemeReactionInput";
import MemeReaction from "../models/MemeReaction";
import RealMemeReactionService from "../services/MemeReactionService";

@Route("memereactions")
@Tags("MemeReaction")
export class MemeReactionController extends Controller {
  /** React to meme */
  @Post()
  async createMemeReaction(@Body() input: CreateMemeReactionInput): Promise<MemeReaction> {
    const { memeId, userId, reaction: reactionInput } = input;

    const actionService = new RealActionService();
    const reactionService = new RealReactionService();
    // const memeService = new RealMemeService();
    const memeReactionService = new RealMemeReactionService();
    const userService = new RealUserService();

    const reaction = await reactionService.upsertReaction(reactionInput);
    const memeReaction = await memeReactionService.createMemeReaction(memeId, userId, reaction.id);

    const action = await actionService.createAction({
      type: ActionType.ReactToMeme,
      userId,
      memeId,
      memeReactionId: memeReaction.id
    });

    // TODO
    // await memeService.addReaction(memeId, memeReaction.id);

    // TODO
    // await userService.addMemeReaction(memeId, memeReaction.id);

    await userService.addAction(action._id, userId);
    await userService.publishAction(action._id, userId);

    return memeReaction;
  }
}
