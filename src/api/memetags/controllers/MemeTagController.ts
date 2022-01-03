import { Controller, Get, Path, Route, Tags } from "tsoa";
import { MemeTagModel } from "../../../models";
import MemeTag from "../models/MemeTag";

@Route("memetags")
@Tags("MemeTag")
export class MemeTagController extends Controller {
  /** Get meme tag by ID */
  @Get("{memeTagId}")
  async getMemeTag(@Path() memeTagId: string): Promise<MemeTag | null> {
    try {
      if (!memeTagId) throw new Error();

      const memeTag = await MemeTagModel.findById(memeTagId);
      if (!memeTag) throw new Error();

      return memeTag.toPojo();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
