import { DocumentType } from "@typegoose/typegoose";
import { MemeNotFound } from "../../../errors";
import { MemeModel } from "../../../models";
import Comment from "../../comments/models/Comment";
import MemeReaction from "../../memereactions/models/MemeReaction";
import MemeUpvote from "../../memeupvotes/models/MemeUpvote";
import Template from "../../templates/models/Template";
import User from "../../users/models/User";

export interface GodMeme {
  id: string;
  template: Template;
  user: User;
  caption?: string;
  location?: string;
  upvotes?: MemeUpvote[];
  comments?: Comment[];
  reactions?: MemeReaction[];
}

export class RealGodMeme implements GodMeme {
  readonly id: string;
  readonly caption?: string;
  readonly location?: string;
  template!: Template;
  user!: User;
  upvotes?: MemeUpvote[];
  comments?: Comment[];
  reactions?: MemeReaction[];

  constructor(id: string, caption?: string, location?: string) {
    this.id = id;
    this.caption = caption;
    this.location = location;
  }

  public async populate() {
    try {
      const meme = await MemeModel.findById(this.id)
        .populate("templateId")
        .populate("userId")
        .populate("upvoteIds")
        .populate("commentIds")
        .populate("reactionIds")
        .exec();

      if (!meme) throw new MemeNotFound();

      if (meme.templateId) {
        this.template = meme.templateId as unknown as DocumentType<Template>;
        console.log("hitting");
        this.template;
      }
      if (meme.userId) this.user = meme.userId as unknown as DocumentType<User>;
      if (meme.upvoteIds) {
        this.upvotes = [];
        for (const upvote of meme.upvoteIds as unknown as DocumentType<MemeUpvote>[]) {
          this.upvotes.push(upvote);
        }
      }
      if (meme.commentIds) {
        this.comments = [];
        for (const comment of meme.commentIds as unknown as DocumentType<Comment>[]) {
          this.comments.push(comment);
        }
      }
      if (meme.reactionIds) {
        this.reactions = [];
        for (const reaction of meme.reactionIds as unknown as DocumentType<MemeReaction>[]) {
          this.reactions.push(reaction);
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
