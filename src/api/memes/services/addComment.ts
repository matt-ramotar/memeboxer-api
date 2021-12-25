import { CommentNotFound, MemeNotFound, RelationshipAlreadyExists } from "../../../errors";
import isIn from "../../../helpers/isIn";
import { CommentModel, MemeModel } from "../../../models";

export default async function addComment(memeId: string, commentId: string): Promise<void> {
  try {
    const meme = await MemeModel.findById(memeId);
    if (!meme) throw new MemeNotFound();

    const comment = await CommentModel.findById(commentId);
    if (!comment) throw new CommentNotFound();

    if (isIn(commentId, meme.commentIds)) throw new RelationshipAlreadyExists();

    if (meme.commentIds) meme.commentIds.push(commentId);
    else meme.commentIds = [commentId];

    await meme.save();
  } catch (error) {
    throw error;
  }
}
