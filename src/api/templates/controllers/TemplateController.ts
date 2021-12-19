import { Body, Controller, Path, Post, Route, Tags } from "tsoa";
import { CreateTemplateInput } from "../entities/CreateTemplateInput";
import { UpdateEntityTagInput } from "../entities/UpdateEntityTagInput";
import Template from "../models/Template";
import RealTemplateService from "../services/TemplateService";

@Route("templates")
@Tags("Template")
export class TemplateController extends Controller {
  /** Create template */
  @Post()
  async createTemplate(@Body() input: CreateTemplateInput): Promise<Template> {
    return await new RealTemplateService().createTemplate(input);
  }

  /** Update template entity tag */
  @Post("{templateId}/tag")
  async updateEntityTag(@Path() templateId: string, @Body() input: UpdateEntityTagInput): Promise<Template> {
    return await new RealTemplateService().updateEntityTag(templateId, input.entityTag);
  }
}
