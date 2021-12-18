import { ActionType } from "../models/ActionType";

export interface CreateActionInput {
  type: ActionType;
  userId: string;
  otherUserId?: string;
  templateId?: string;
  memeId?: string;
  tagId?: string;
  commentId?: string;
  otherCommentId?: string;
  memeReactionId?: string;
  commentReactionId?: string;
}
