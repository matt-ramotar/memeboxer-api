import { TemplateNotFound } from "../../../errors";
import { TemplateModel } from "../../../models";
import Template from "../models/Template";

export default async function updateEntityTag(templateId: string, entityTag: string): Promise<Template> {
  try {
    const template = await TemplateModel.findById(templateId);
    if (!template) throw new TemplateNotFound();

    template.entityTag = entityTag;
    await template.save();

    return template.toPojo();
  } catch (error) {
    throw error;
  }
}
