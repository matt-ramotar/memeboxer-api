import { UserNotFound } from "../../../errors";
import { ActionModel, UserModel } from "../../../models";
import { Feed, RealFeed } from "../../actions/models/Feed";
import { FeedType } from "../../actions/models/FeedType";

export default async function getFeed(userId: string, type: string, offset: number): Promise<Feed> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    switch (type) {
      case FeedType.MainFeed:
        if (!user.feed) return new RealFeed([]);

        const startA = Math.max(0, offset - 1);
        const endA = Math.min(user.feed.length, offset + 29);
        const actionIdsA = user.feed.reverse().slice(startA, endA);

        const godActionsA = [];
        for (const actionId of actionIdsA) {
          const action = await ActionModel.findById(actionId);

          if (!action) continue;

          godActionsA.push(await action.toGodAction());
        }

        return new RealFeed(godActionsA);

      case FeedType.ProfileFeed:
        if (!user.actionIds) return new RealFeed([]);
        const start = Math.max(0, offset - 1);
        const end = Math.min(user.actionIds.length, offset + 29);
        const actionIds = user.actionIds.reverse().slice(start, end);

        const godActions = [];
        for (const actionId of actionIds) {
          const action = await ActionModel.findById(actionId);

          if (!action) continue;

          godActions.push(await action.toGodAction());
        }

        return new RealFeed(godActions);

      default:
        return new RealFeed([]);
    }
  } catch (error) {
    throw error;
  }
}
