import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import { TagModel } from "../../../models";
import { CreateTagInput } from "../entities/CreateTagInput";
import { GodTag } from "../models/GodTag";
import Tag from "../models/Tag";
import RealTagService from "../services/TagService";

@Route("tags")
@Tags("Tag")
export class TagController extends Controller {
  /** Upsert tag */
  @Post()
  async createTag(@Body() input: CreateTagInput): Promise<Tag> {
    if (await TagModel.findOne({ tag: input.tag })) return (await TagModel.findOne({ tag: input.tag }))!.toPojo();

    return await new RealTagService().createTag(input);
  }

  /** Get tags */
  @Get()
  async getTags(): Promise<Tag[]> {
    return await new RealTagService().getTags();
  }

  /** Get god tag by ID or by tag name */
  @Get("{tagId}/god")
  async getGodTagById(@Path() tagId: string): Promise<GodTag> {
    return await new RealTagService().getGodTagById(tagId);
  }
}
