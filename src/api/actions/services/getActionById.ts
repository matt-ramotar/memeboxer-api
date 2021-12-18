import { ActionNotFound } from "../../../errors";
import { ActionModel } from "../../../models";
import { GodAction } from "../models/GodAction";

export default async function getActionById(actionId: string): Promise<GodAction> {
  try {
    const action = await ActionModel.findById(actionId);
    if (!action) throw new ActionNotFound();

    return await action.toGodAction();
  } catch (error) {
    throw error;
  }
}
