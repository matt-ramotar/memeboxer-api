import { TemplateModel } from "../../../models";
import { CreateTemplateInput } from "../entities/CreateTemplateInput";
import Template from "../models/Template";

export default async function createTemplate(input: CreateTemplateInput): Promise<Template> {
  try {
    const template = await TemplateModel.create(input);
    return template.toPojo();
  } catch (error) {
    throw error;
  }
}
