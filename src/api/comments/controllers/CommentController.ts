import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from "tsoa";
import { CommentModel, MemeModel } from "../../../models";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealAuthService from "../../auth/services/AuthService";
import CommentReaction from "../../commentreactions/models/CommentReaction";
import RealCommentReactionService from "../../commentreactions/services/CommentReactionService";
import RealMemeService from "../../memes/services/MemeService";
import RealNotificationService from "../../notifications/services/NotificationService";
import RealUserService from "../../users/services/UserService";
import { CreateCommentCommentReactionInput } from "../entities/CreateCommentCommentReactionInput";
import { CreateCommentInput } from "../entities/CreateCommentInput";
import { DeleteCommentInput } from "../entities/DeleteCommentInput";
import Comment from "../models/Comment";
import { GodComment } from "../models/GodComment";
import RealCommentService from "../services/CommentService";

@Route("comments")
@Tags("Comment")
export class CommentController extends Controller {
  /** Create comment */
  @Post()
  async createComment(@Body() input: CreateCommentInput): Promise<GodComment> {
    const { userId, parentCommentId, memeId, isDirect } = input;

    const commentService = new RealCommentService();
    const userService = new RealUserService();
    const memeService = new RealMemeService();
    const actionService = new RealActionService();
    const notificationService = new RealNotificationService();

    const comment = await commentService.createComment(input);

    await userService.addComment(userId, comment.id);
    if (memeId && isDirect) await memeService.addComment(memeId, comment.id);
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
    console.log("GOD COMMENT");
    const godComment = await commentService.getGodCommentById(commentId);
    return godComment;
  }

  /** Create comment reaction. */
  @Post("{commentId}/reactions")
  async createCommentReaction(@Path() commentId: string, @Body() input: CreateCommentCommentReactionInput): Promise<CommentReaction | null> {
    const commentReactionService = new RealCommentReactionService();
    const commentService = new RealCommentService();
    const userService = new RealUserService();
    const actionService = new RealActionService();
    const notificationService = new RealNotificationService();

    try {
      const commentReaction = await commentReactionService.createCommentReaction(commentId, input.userId, input.reactionId);
      const comment = await commentService.getGodCommentById(commentId);

      if (!commentReaction || !comment) throw new Error();

      await commentService.addCommentReaction(commentId, commentReaction.id);
      await userService.addCommentReaction(input.userId, commentReaction.id);

      const action = await actionService.createAction({
        type: ActionType.ReactToComment,
        userId: input.userId,
        commentId,
        commentReactionId: commentReaction.id,
        otherUserId: comment.user.id
      });

      await userService.addAction(action._id, input.userId);
      await userService.publishAction(action._id, input.userId);

      const notification = await notificationService.createNotification(comment.user.id, action._id);
      await userService.addNotification(comment.user.id, notification._id);

      return commentReaction;
    } catch (error) {
      return null;
    }
  }

  /** Delete comment */
  @Delete("{commentId}")
  async deleteComment(@Path() commentId: string, @Body() input: DeleteCommentInput): Promise<Comment | null> {
    try {
      const authService = new RealAuthService();
      const commentService = new RealCommentService();
      const memeService = new RealMemeService();
      const userService = new RealUserService();

      const canDeleteComment = await authService.canDeleteComment(input.userId, commentId, input.token);
      if (!canDeleteComment) throw new Error();

      console.log(commentId, input);

      const comment = await commentService.deleteComment(commentId);
      if (!comment) throw new Error();

      await userService.removeComment(commentId, input.userId);

      if (comment.memeId) {
        await memeService.removeComment(commentId, comment.memeId);
      }

      if (comment.parentCommentId) {
        await commentService.removeChildComment(commentId, comment.parentCommentId);
      }

      return comment;
    } catch (error) {
      return null;
    }
  }
}
