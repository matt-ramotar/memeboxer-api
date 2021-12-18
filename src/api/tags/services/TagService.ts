import { CreateTagInput } from "../entities/CreateTagInput";
import { GodTag } from "../models/GodTag";
import Tag from "../models/Tag";
import addMeme from "./addMeme";
import addUser from "./addUser";
import createTag from "./createTag";
import getGodTagById from "./getGodTagById";
import getTags from "./getTags";
import removeUser from "./removeUser";

interface TagService {
  createTag(input: CreateTagInput): Promise<Tag>;
  getTags(): Promise<Tag[]>;
  addMeme(memeId: string, tagId: string): Promise<void>;
  addUser(tagId: string, userId: string): Promise<void>;
  removeUser(tagId: string, userId: string): Promise<void>;
  getGodTagById(tagId: string): Promise<GodTag>;
}

export default class RealTagService implements TagService {
  public async createTag(input: CreateTagInput): Promise<Tag> {
    return await createTag(input);
  }

  public async getTags(): Promise<Tag[]> {
    return await getTags();
  }

  public async addMeme(memeId: string, tagId: string): Promise<void> {
    return await addMeme(memeId, tagId);
  }

  public async addUser(tagId: string, userId: string): Promise<void> {
    return await addUser(tagId, userId);
  }

  public async removeUser(tagId: string, userId: string): Promise<void> {
    return await removeUser(tagId, userId);
  }

  public async getGodTagById(tagId: string): Promise<GodTag> {
    return await getGodTagById(tagId);
  }
}
