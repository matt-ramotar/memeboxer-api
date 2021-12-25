import { TemplateModel } from "../../../models";

export default async function removeMeme(memeId: string, templateId: string): Promise<void> {
  const template = await TemplateModel.findById(templateId);

  if (!template || !template.memeIds) return;
  template.memeIds = template.memeIds.filter((id) => id != memeId);

  await template.save();
}
