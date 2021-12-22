import isIn from "../../../helpers/isIn";
import { MemeModel, TemplateModel } from "../../../models";

export default async function addMeme(memeId: string, templateId: string): Promise<void> {
  const template = await TemplateModel.findById(templateId);
  const meme = await MemeModel.findById(memeId);

  if (!template || !meme) return;
  if (isIn(memeId, template.memeIds)) return;

  if (template.memeIds) template.memeIds.push(memeId);
  else template.memeIds = [memeId];

  await template.save();
}
