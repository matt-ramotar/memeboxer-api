import { DocumentType } from "@typegoose/typegoose";
import { ActionModel } from "../../../models";
import { CreateActionInput } from "../entities/CreateActionInput";
import Action from "../models/Action";

export default async function createAction(input: CreateActionInput): Promise<DocumentType<Action>> {
  try {
    return await ActionModel.create(input);
  } catch (error) {
    throw error;
  }
}
