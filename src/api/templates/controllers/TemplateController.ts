import { Body, Controller, Path, Post, Route, Tags } from "tsoa";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealUserService from "../../users/services/UserService";
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
    const actionService = new RealActionService();
    const templateService = new RealTemplateService();
    const userService = new RealUserService();

    const template = await templateService.createTemplate(input);
    await userService.addTemplate(template.id, input.userId);

    const action = await actionService.createAction({
      type: ActionType.CreateTemplate,
      userId: input.userId,
      templateId: template.id
    });

    await userService.addAction(action._id, input.userId);
    await userService.publishAction(action._id, input.userId);

    return template;
  }

  /** Update template entity tag */
  @Post("{templateId}/tag")
  async updateEntityTag(@Path() templateId: string, @Body() input: UpdateEntityTagInput): Promise<Template> {
    return await new RealTemplateService().updateEntityTag(templateId, input.entityTag);
  }
}
