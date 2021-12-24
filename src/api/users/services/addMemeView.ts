import { MemeViewNotFound, UserNotFound } from "../../../errors";
import { MemeViewModel, UserModel } from "../../../models";

export default async function addMemeView(userId: string, memeViewId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    const memeView = await MemeViewModel.findById(memeViewId);
    if (!memeView) throw new MemeViewNotFound();

    if (user.memeViewIds) user.memeViewIds.push(memeView._id);
    else user.memeViewIds = [memeView._id];

    await user.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
