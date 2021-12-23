import { Body, Controller, Post, Route, Tags } from "tsoa";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealCommentService from "../../comments/services/CommentService";
import RealReactionService from "../../reactions/services/ReactionService";
import RealUserService from "../../users/services/UserService";
import { CreateCommentReactionInput } from "../entities/CreateCommentReactionInput";
import CommentReaction from "../models/CommentReaction";
import RealCommentReactionService from "../services/CommentReactionService";

@Route("commentreactions")
@Tags("CommentReaction")
export class CommentReactionController extends Controller {
  /** React to comment */
  @Post()
  async createCommentReaction(@Body() input: CreateCommentReactionInput): Promise<CommentReaction> {
    const { commentId, userId, reaction: reactionInput } = input;

    const actionService = new RealActionService();
    const reactionService = new RealReactionService();
    const commentService = new RealCommentService();
    const commentReactionService = new RealCommentReactionService();
    const userService = new RealUserService();

    const reaction = await reactionService.upsertReaction(reactionInput);
    const commentReaction = await commentReactionService.createCommentReaction(commentId, userId, reaction.id);

    const action = await actionService.createAction({
      type: ActionType.ReactToComment,
      userId,
      commentId,
      commentReactionId: commentReaction.id
    });

    await commentService.addCommentReaction(commentId, commentReaction.id);
    await userService.addCommentReaction(userId, commentReaction.id);

    await userService.addAction(action._id, userId);
    await userService.publishAction(action._id, userId);

    return commentReaction;
  }
}
