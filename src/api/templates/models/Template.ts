import { DocumentType, prop } from "@typegoose/typegoose";
import Meme from "../../memes/models/Meme";
import User from "../../users/models/User";
import { TemplateData } from "../entities/TemplateData";
import { GodTemplate, RealGodTemplate } from "./GodTemplate";

/**
 * @tsoaModel
 */

export default class Template {
  @prop()
  id!: string;

  @prop()
  name!: string;

  @prop()
  entityTag?: string;

  @prop()
  data?: TemplateData[];

  @prop({ ref: () => Meme })
  memeIds?: string[];

  @prop({ ref: () => User })
  userId!: string;

  public async toGodTemplate(this: DocumentType<Template>): Promise<GodTemplate> {
    const godTemplate = new RealGodTemplate(this._id, this.entityTag, this.data);
    await godTemplate.populate();
    return godTemplate;
  }

  public toPojo(this: DocumentType<Template>): Template {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
