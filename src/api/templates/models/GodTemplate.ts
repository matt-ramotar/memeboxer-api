import { DocumentType } from "@typegoose/typegoose";
import { TemplateModel } from "../../../models";
import Meme from "../../memes/models/Meme";
import { TemplateData } from "../entities/TemplateData";

export interface GodTemplate {
  id: string;
  imageUrl: string;
  data?: TemplateData[];
  memes?: Meme[];
}

export class RealGodTemplate implements GodTemplate {
  readonly id: string;
  readonly imageUrl: string;
  readonly data?: TemplateData[];
  memes?: Meme[];

  constructor(id: string, imageUrl: string, data?: TemplateData[]) {
    this.id = id;
    this.imageUrl = imageUrl;
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
    } catch (error) {
      throw error;
    }
  }
}
