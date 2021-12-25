import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import { CommentModel, MemeModel } from "../../../models";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealMemeService from "../../memes/services/MemeService";
import RealNotificationService from "../../notifications/services/NotificationService";
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
    const memeService = new RealMemeService();
    const actionService = new RealActionService();
    const notificationService = new RealNotificationService();

    const comment = await commentService.createComment(input);

    await userService.addComment(userId, comment.id);
    if (memeId) await memeService.addComment(memeId, comment.id);
    if (parentCommentId) commentService.addChildComment(comment.id, parentCommentId);

    const userWhoPostedMemeId = (await MemeModel.findById(memeId))?.userId;
    const userWhoPostedParentCommentId = (await CommentModel.findById(parentCommentId))?.userId;

    const actionType = parentCommentId ? ActionType.AddCommentToComment : ActionType.AddCommentToMeme;

    const action = await actionService.createAction({
      type: actionType,
      userId,
      commentId: comment.id,
      otherCommentId: parentCommentId,
      memeId
    });

    await userService.addAction(action._id, userId);
    await userService.publishAction(action._id, userId);

    if (userWhoPostedMemeId) {
      const notification = await notificationService.createNotification(userWhoPostedMemeId, action._id);
      await userService.addNotification(userWhoPostedMemeId, notification._id);
    }

    if (userWhoPostedParentCommentId) {
      const notification = await notificationService.createNotification(userWhoPostedParentCommentId, action._id);
      await userService.addNotification(userWhoPostedParentCommentId, notification._id);
    }

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
