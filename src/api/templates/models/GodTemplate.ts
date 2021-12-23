import { DocumentType } from "@typegoose/typegoose";
import { TemplateModel } from "../../../models";
import Meme from "../../memes/models/Meme";
import User from "../../users/models/User";
import { TemplateData } from "../entities/TemplateData";

export interface GodTemplate {
  id: string;
  name: string;
  entityTag?: string;
  data?: TemplateData[];
  memes?: Meme[];
  user: User;
}

export class RealGodTemplate implements GodTemplate {
  readonly id: string;
  readonly name: string;
  readonly entityTag?: string;
  readonly data?: TemplateData[];
  memes?: Meme[];
  user!: User;

  constructor(id: string, name: string, entityTag?: string, data?: TemplateData[]) {
    this.id = id;
    this.name = name;
    this.entityTag = entityTag;
    this.data = data;
  }

  public async populate() {
    try {
      const template = await TemplateModel.findById(this.id).populate("memeIds").exec();
      if (!template) return;

      if (template.memeIds) {
        this.memes = [];

        for (const meme of template.memeIds as unknown as DocumentType<Meme>[]) {
          this.memes.push(meme);
        }
      }

      if (template.userId) this.user = template.userId as unknown as DocumentType<User>;
    } catch (error) {
      throw error;
    }
  }
}
