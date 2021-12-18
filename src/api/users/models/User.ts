import { DocumentType, prop } from "@typegoose/typegoose";
import Action from "../../actions/models/Action";
import CommentReaction from "../../commentreactions/models/CommentReaction";
import Comment from "../../comments/models/Comment";
import CommentUpvote from "../../commentupvotes/models/CommentUpvote";
import MemeReaction from "../../memereactions/models/MemeReaction";
import Meme from "../../memes/models/Meme";
import MemeUpvote from "../../memeupvotes/models/MemeUpvote";
import Tag from "../../tags/models/Tag";
import { GodUser, RealGodUser } from "./GodUser";

/**
 * @tsoaModel
 */

export default class User {
  @prop({ ref: () => User })
  id!: string;

  @prop()
  name!: string;

  @prop({ unique: true })
  email!: string;

  @prop({ unique: true })
  username!: string;

  @prop()
  googleId!: string;

  @prop()
  picture?: string;

  @prop()
  isLoggedIn?: boolean;

  @prop({ ref: () => User })
  usersFollowingIds?: string[];

  @prop({ ref: () => User })
  usersFollowedByIds?: string[];

  @prop({ ref: () => Tag })
  tagsFollowingIds?: string[];

  @prop({ ref: () => Meme })
  memeIds?: string[];

  @prop({ ref: () => MemeUpvote })
  memeUpvoteIds?: string[];

  @prop({ ref: () => CommentUpvote })
  commentUpvoteIds?: string[];

  @prop({ ref: () => MemeReaction })
  memeReactionIds?: string[];

  @prop({ ref: () => CommentReaction })
  commentReactionIds?: string[];

  @prop({ ref: () => Comment })
  commentIds?: string[];

  @prop({ ref: () => Action })
  actionIds?: string[];

  @prop({ ref: () => Action })
  feed?: string[];

  public toPojo(this: DocumentType<User>): User {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }

  public async toGodUser(this: DocumentType<User>): Promise<GodUser> {
    const godUser = new RealGodUser(this._id, this.name, this.email, this.username, this.googleId, this.picture);
    await godUser.populate();
    return godUser;
  }

  public async publishAction(this: DocumentType<User>, actionId: string) {
    await this.populate("usersFollowedByIds")
      .execPopulate()
      .then((user: DocumentType<User>) => user.usersFollowedByIds as unknown as DocumentType<User>[])
      .then((followers: DocumentType<User>[]) =>
        followers.forEach((follower: DocumentType<User>) => {
          if (follower.feed) follower.feed.push(actionId);
          else follower.feed = [actionId];
          follower.save();
        })
      );
  }
}
