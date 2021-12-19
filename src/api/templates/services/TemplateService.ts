import { CreateTemplateInput } from "../entities/CreateTemplateInput";
import Template from "../models/Template";
import createTemplate from "./createTemplate";
import updateEntityTag from "./updateEntityTag";

interface TemplateService {
  createTemplate(input: CreateTemplateInput): Promise<Template>;
  updateEntityTag(templateId: string, entityTag: string): Promise<Template>;
}

export default class RealTemplateService implements TemplateService {
  public async createTemplate(input: CreateTemplateInput): Promise<Template> {
    return await createTemplate(input);
  }

  public async updateEntityTag(templateId: string, entityTag: string): Promise<Template> {
    return await updateEntityTag(templateId, entityTag);
  }
}
