import { UpsertReactionInput } from "../../reactions/entities/UpsertReactionInput";

export interface CreateCommentReactionInput {
  commentId: string;
  userId: string;
  reaction: UpsertReactionInput;
}
