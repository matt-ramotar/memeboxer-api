export interface CreateCommentInput {
  userId: string;
  parentCommentId?: string;
  body: string;
  memeId?: string;
}
