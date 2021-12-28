import { DocumentType } from "@typegoose/typegoose";
import Comment from "../../comments/models/Comment";
import Meme from "../../memes/models/Meme";
import Tag from "../../tags/models/Tag";
import Template from "../../templates/models/Template";
import User from "../../users/models/User";
import getComments from "./getComments";
import getMemes from "./getMemes";
import getTags from "./getTags";
import getTemplates from "./getTemplates";
import getUsers from "./getUsers";

interface SearchService {
  getUsers(input: string): Promise<DocumentType<User>[]>;
  getMemes(input: string): Promise<DocumentType<Meme>[]>;
  getTags(input: string): Promise<DocumentType<Tag>[]>;
  getTemplates(input: string): Promise<DocumentType<Template>[]>;
  getComments(input: string): Promise<DocumentType<Comment>[]>;
}

export default class RealSearchService implements SearchService {
  public async getMemes(input: string): Promise<DocumentType<Meme>[]> {
    return await getMemes(input);
  }
  public async getTags(input: string): Promise<DocumentType<Tag>[]> {
    return await getTags(input);
  }
  public async getTemplates(input: string): Promise<DocumentType<Template>[]> {
    return await getTemplates(input);
  }
  public async getComments(input: string): Promise<DocumentType<Comment>[]> {
    return await getComments(input);
  }
  public async getUsers(input: string): Promise<DocumentType<User>[]> {
    return await getUsers(input);
  }
}
