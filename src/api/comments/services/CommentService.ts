import { CreateCommentInput } from "../entities/CreateCommentInput";
import { GodComment } from "../models/GodComment";
import addChildComment from "./addChildComment";
import addCommentReaction from "./addCommentReaction";
import createComment from "./createComment";
import getGodCommentById from "./getGodCommentById";

interface CommentService {
  createComment(input: CreateCommentInput): Promise<GodComment>;
  addChildComment(childId: string, parentId: string): Promise<void>;
  addCommentReaction(commentId: string, commentReactionId: string): Promise<void>;
  getGodCommentById(commentId: string): Promise<GodComment>;
}

export default class RealCommentService implements CommentService {
  public async createComment(input: CreateCommentInput): Promise<GodComment> {
    return await createComment(input);
  }

  public async addChildComment(childId: string, parentId: string): Promise<void> {
    return await addChildComment(childId, parentId);
  }

  public async addCommentReaction(commentId: string, commentReactionId: string): Promise<void> {
    return await addCommentReaction(commentId, commentReactionId);
  }

  public async getGodCommentById(commentId: string): Promise<GodComment> {
    return await getGodCommentById(commentId);
  }
}
