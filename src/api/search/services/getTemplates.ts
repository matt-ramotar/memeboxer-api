import { DocumentType } from "@typegoose/typegoose";
import { TemplateModel } from "../../../models";
import Template from "../../templates/models/Template";

export default async function getTemplates(input: string): Promise<DocumentType<Template>[]> {
  return await TemplateModel.find({ name: { $regex: input, $options: "i" } });
}
