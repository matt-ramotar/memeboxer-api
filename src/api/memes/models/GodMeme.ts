import { DocumentType } from "@typegoose/typegoose";
import { MemeNotFound } from "../../../errors";
import { MemeModel } from "../../../models";
import Comment from "../../comments/models/Comment";
import MemeReaction from "../../memereactions/models/MemeReaction";
import MemeTag from "../../memetags/models/MemeTag";
import MemeUpvote from "../../memeupvotes/models/MemeUpvote";
import MemeView from "../../memeviews/models/MemeView";
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
  memeViews?: MemeView[];
  text?: string[];
  memeTags?: MemeTag[];
}

export class RealGodMeme implements GodMeme {
  readonly id: string;
  readonly created: Date;
  readonly caption?: string;
  readonly location?: string;
  readonly text?: string[];
  template!: Template;
  user!: User;
  upvotes?: MemeUpvote[];
  comments?: Comment[];
  reactions?: MemeReaction[];
  memeViews?: MemeView[];
  memeTags?: MemeTag[];

  constructor(id: string, created: Date, caption?: string, location?: string, text?: string[]) {
    this.id = id;
    this.created = created;
    this.caption = caption;
    this.location = location;
    this.text = text;
  }

  public async populate() {
    try {
      const meme = await MemeModel.findById(this.id)
        .populate("templateId")
        .populate("userId")
        .populate("upvoteIds")
        .populate("commentIds")
        .populate("reactionIds")
        .populate("memeViewIds")
        .populate("memeTagIds")
        .exec();

      if (!meme) throw new MemeNotFound();

      if (meme.templateId) this.template = (meme.templateId as unknown as DocumentType<Template>).toPojo();

      if (meme.userId) this.user = (meme.userId as unknown as DocumentType<User>).toPojo();

      if (meme.upvoteIds) {
        this.upvotes = [];
        for (const upvote of meme.upvoteIds as unknown as DocumentType<MemeUpvote>[]) {
          this.upvotes.push(upvote.toPojo());
        }
      }
      if (meme.commentIds) {
        this.comments = [];
        for (const comment of meme.commentIds as unknown as DocumentType<Comment>[]) {
          this.comments.push(comment.toPojo());
        }
      }
      if (meme.reactionIds) {
        this.reactions = [];
        for (const reaction of meme.reactionIds as unknown as DocumentType<MemeReaction>[]) {
          this.reactions.push(reaction.toPojo());
        }
      }

      if (meme.memeViewIds) this.memeViews = (meme.memeViewIds as unknown as DocumentType<MemeView>[]).map((memeView) => memeView.toPojo());
      if (meme.memeTagIds) this.memeTags = (meme.memeTagIds as unknown as DocumentType<MemeTag>[]).map((memeTag) => memeTag.toPojo());
    } catch (error) {
      throw error;
    }
  }
}
