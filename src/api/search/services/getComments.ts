import { DocumentType } from "@typegoose/typegoose";
import { CommentModel } from "../../../models";
import Comment from "../../comments/models/Comment";

export default async function getComments(input: string): Promise<DocumentType<Comment>[]> {
  return await CommentModel.find({ body: { $regex: input, $options: "i" } });
}
