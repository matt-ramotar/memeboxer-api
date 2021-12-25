import { CreateTemplateInput } from "../entities/CreateTemplateInput";
import Template from "../models/Template";
import addMeme from "./addMeme";
import createTemplate from "./createTemplate";
import removeMeme from "./removeMeme";
import updateEntityTag from "./updateEntityTag";

interface TemplateService {
  createTemplate(input: CreateTemplateInput): Promise<Template>;
  updateEntityTag(templateId: string, entityTag: string): Promise<Template>;
  addMeme(memeId: string, templateId: string): Promise<void>;
  removeMeme(memeId: string, templateId: string): Promise<void>;
}

export default class RealTemplateService implements TemplateService {
  public async createTemplate(input: CreateTemplateInput): Promise<Template> {
    return await createTemplate(input);
  }

  public async updateEntityTag(templateId: string, entityTag: string): Promise<Template> {
    return await updateEntityTag(templateId, entityTag);
  }

  public async addMeme(memeId: string, templateId: string): Promise<void> {
    return await addMeme(memeId, templateId);
  }

  public async removeMeme(memeId: string, templateId: string): Promise<void> {
    return await removeMeme(memeId, templateId);
  }
}
