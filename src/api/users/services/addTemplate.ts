import isIn from "../../../helpers/isIn";
import { TemplateModel, UserModel } from "../../../models";

export default async function addTemplate(templateId: string, userId: string): Promise<void> {
  const user = await UserModel.findById(userId);
  const template = await TemplateModel.findById(templateId);

  if (!user || !template) return;
  if (isIn(templateId, user.templateIds)) return;

  if (user.templateIds) user.templateIds.push(templateId);
  else user.templateIds = [templateId];

  await user.save();
}
