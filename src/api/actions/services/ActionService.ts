import { DocumentType } from "@typegoose/typegoose";
import { CreateActionInput } from "../entities/CreateActionInput";
import Action from "../models/Action";
import { GodAction } from "../models/GodAction";
import createAction from "./createAction";
import getActionById from "./getActionById";

interface ActionService {
  createAction(input: CreateActionInput): Promise<DocumentType<Action>>;
  getActionById(actionId: string): Promise<GodAction>;
}

export default class RealActionService implements ActionService {
  public async createAction(input: CreateActionInput): Promise<DocumentType<Action>> {
    return await createAction(input);
  }

  public async getActionById(actionId: string): Promise<GodAction> {
    return await getActionById(actionId);
  }
}
