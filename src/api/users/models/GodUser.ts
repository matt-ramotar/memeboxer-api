import { DocumentType } from "@typegoose/typegoose";
import { UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";
import Action from "../../actions/models/Action";
import CommentReaction from "../../commentreactions/models/CommentReaction";
import Comment from "../../comments/models/Comment";
import CommentUpvote from "../../commentupvotes/models/CommentUpvote";
import MemeReaction from "../../memereactions/models/MemeReaction";
import Meme from "../../memes/models/Meme";
import MemeUpvote from "../../memeupvotes/models/MemeUpvote";
import Tag from "../../tags/models/Tag";
import User from "./User";

export interface GodUser {
  id: string;
  name: string;
  email: string;
  username: string;
  googleId: string;
  picture?: string;
  usersFollowing?: User[];
  usersFollowedBy?: User[];
  tagsFollowing?: Tag[];
  memes?: Meme[];
  memeUpvotes?: MemeUpvote[];
  memeReactions?: MemeReaction[];
  comments?: Comment[];
  commentUpvotes?: CommentUpvote[];
  commentReactions?: CommentReaction[];
  actions?: Action[];
}

export class RealGodUser implements GodUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly username: string;
  readonly picture?: string;
  readonly googleId: string;
  usersFollowing?: User[];
  usersFollowedBy?: User[];
  tagsFollowing?: Tag[];
  memes?: Meme[];
  memeUpvotes?: MemeUpvote[];
  memeReactions?: MemeReaction[];
  comments?: Comment[];
  commentUpvotes?: CommentUpvote[];
  commentReactions?: CommentReaction[];
  actions?: Action[];

  constructor(id: string, name: string, email: string, username: string, googleId: string, picture?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.username = username;
    this.picture = picture;
    this.googleId = googleId;
  }

  public async populate() {
    try {
      const user = await UserModel.findById(this.id)
        .populate("usersFollowingIds")
        .populate("usersFollowedByIds")
        .populate("tagsFollowingIds")
        .populate("memeIds")
        .populate("memeUpvoteIds")
        .populate("memeReactionIds")
        .populate("commentIds")
        .populate("commentUpvoteIds")
        .populate("commentReactionIds")
        .populate("actionIds")
        .exec();

      if (!user) throw new UserNotFound();

      this.usersFollowing = user.usersFollowingIds as unknown as DocumentType<User>[];
      this.usersFollowedBy = user.usersFollowedByIds as unknown as DocumentType<User>[];
      this.tagsFollowing = (user.tagsFollowingIds as unknown as DocumentType<Tag>[]).map((tag) => tag.toPojo());
      this.memes = user.memeIds as unknown as DocumentType<Meme>[];
      this.memeUpvotes = user.memeUpvoteIds as unknown as DocumentType<MemeUpvote>[];
      this.memeReactions = user.memeReactionIds as unknown as DocumentType<MemeReaction>[];
      this.comments = (user.commentIds as unknown as DocumentType<Comment>[]).map((comment) => comment.toPojo());
      this.commentUpvotes = (user.commentUpvoteIds as unknown as DocumentType<CommentUpvote>[]).map((upvote) => upvote.toPojo());
      this.commentReactions = (user.commentReactionIds as unknown as DocumentType<CommentReaction>[]).map((reaction) => reaction.toPojo());
      this.actions = (user.actionIds as unknown as DocumentType<Action>[]).map((action) => action.toPojo());
    } catch (error) {
      throw error;
    }
  }
}
