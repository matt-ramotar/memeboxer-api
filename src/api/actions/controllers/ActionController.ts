import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import { CreateActionInput } from "../entities/CreateActionInput";
import Action from "../models/Action";
import { GodAction } from "../models/GodAction";
import RealActionService from "../services/ActionService";

@Route("actions")
@Tags("Action")
export class ActionController extends Controller {
  /** Get action by ID */
  @Get("{actionId}")
  async getActionById(@Path() actionId: string): Promise<GodAction> {
    return await new RealActionService().getActionById(actionId);
  }

  /** Create action */
  @Post()
  async createAction(@Body() input: CreateActionInput): Promise<Action> {
    return await new RealActionService().createAction(input);
  }
}
