import { Body, Controller, Post, Route, Tags } from "tsoa";
import { UpsertReactionInput } from "../entities/UpsertReactionInput";
import Reaction from "../models/Reaction";
import RealReactionService from "../services/ReactionService";

@Route("reactions")
@Tags("Reaction")
export class ReactionController extends Controller {
  /** Upsert reaction */
  @Post()
  async upsertReaction(@Body() input: UpsertReactionInput): Promise<Reaction | null> {
    try {
      const reactionService = new RealReactionService();

      const reaction = await reactionService.upsertReaction(input);

      return reaction.toPojo();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
