import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealUserService from "../../users/services/UserService";
import { CreateCommentInput } from "../entities/CreateCommentInput";
import { GodComment } from "../models/GodComment";
import RealCommentService from "../services/CommentService";

@Route("comments")
@Tags("Comment")
export class CommentController extends Controller {
  /** Create comment */
  @Post()
  async createComment(@Body() input: CreateCommentInput): Promise<GodComment> {
    const { userId, parentCommentId, memeId } = input;

    const commentService = new RealCommentService();
    const userService = new RealUserService();

    const comment = await commentService.createComment(input);

    await userService.addComment(userId, comment.id);

    // TODO: Add comment to meme using meme id

    if (parentCommentId) commentService.addChildComment(comment.id, parentCommentId);

    const actionType = parentCommentId ? ActionType.AddCommentToComment : ActionType.AddCommentToMeme;

    const action = await new RealActionService().createAction({
      type: actionType,
      userId,
      commentId: comment.id,
      otherCommentId: parentCommentId,
      memeId
    });

    await userService.addAction(action._id, userId);
    await userService.publishAction(action._id, userId);

    return comment;
  }

  /** Get god comment */
  @Get("{commentId}/god")
  async getGodCommentById(@Path() commentId: string): Promise<GodComment> {
    const commentService = new RealCommentService();
    const godComment = await commentService.getGodCommentById(commentId);
    return godComment;
  }
}
