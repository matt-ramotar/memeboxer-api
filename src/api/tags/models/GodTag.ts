import { DocumentType } from "@typegoose/typegoose";
import { TagNotFound } from "../../../errors";
import { TagModel } from "../../../models";
import { GodMeme } from "../../memes/models/GodMeme";
import Meme from "../../memes/models/Meme";
import User from "../../users/models/User";

export interface GodTag {
  id: string;
  tag: string;
  memes?: GodMeme[];
  users?: User[];
}

export class RealGodTag implements GodTag {
  readonly id: string;
  readonly tag: string;
  memes?: GodMeme[];
  users?: User[];

  constructor(id: string, tag: string) {
    this.id = id;
    this.tag = tag;
  }

  public async populate() {
    try {
      const tag = await TagModel.findById(this.id).populate("memeIds").populate("userIds").exec();

      if (!tag) throw new TagNotFound();

      if (tag.memeIds) {
        this.memes = [];

        for (const meme of tag.memeIds as unknown as DocumentType<Meme>[]) {
          this.memes.push(await meme.toGodMeme());
        }
      }
      this.users = tag.userIds as unknown as DocumentType<User>[];
    } catch (error) {
      throw error;
    }
  }
}
