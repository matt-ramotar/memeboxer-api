import { GodAction } from "./GodAction";

export interface Feed {
  godActions: GodAction[];
}

export class RealFeed implements Feed {
  readonly godActions: GodAction[];

  constructor(godActions: GodAction[]) {
    this.godActions = godActions;
  }
}
