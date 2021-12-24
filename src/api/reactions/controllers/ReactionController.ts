import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import { RealMemeboxerError } from "../../../errors";
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

  /** Get reaction by ID */
  @Get("{reactionId}")
  async getReaction(@Path() reactionId: string): Promise<Reaction | null> {
    try {
      const reaction = await new RealReactionService().getReaction(reactionId);
      if (!reaction) throw new RealMemeboxerError("Reaction not created.");
      return reaction.toPojo();
    } catch (error) {
      return null;
    }
  }
}
