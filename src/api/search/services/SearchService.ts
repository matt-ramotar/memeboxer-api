import { DocumentType } from "@typegoose/typegoose";
import Comment from "../../comments/models/Comment";
import Meme from "../../memes/models/Meme";
import Tag from "../../tags/models/Tag";
import Template from "../../templates/models/Template";
import User from "../../users/models/User";
import getUsers from "./getUsers";

interface SearchService {
  getUsers(input: string): Promise<DocumentType<User>[]>;
  getMemes(input: string): Promise<DocumentType<Meme>[]>;
  getTags(input: string): Promise<DocumentType<Tag>[]>;
  getTemplates(input: string): Promise<DocumentType<Template>[]>;
  getComments(input: string): Promise<DocumentType<Comment>[]>;
}

export default class RealSearchService implements SearchService {
  getMemes(input: string): Promise<DocumentType<Meme>[]> {
    console.log(input);
    throw new Error("Method not implemented.");
  }
  getTags(input: string): Promise<DocumentType<Tag>[]> {
    console.log(input);
    throw new Error("Method not implemented.");
  }
  getTemplates(input: string): Promise<DocumentType<Template>[]> {
    console.log(input);
    throw new Error("Method not implemented.");
  }
  getComments(input: string): Promise<DocumentType<Comment>[]> {
    console.log(input);
    throw new Error("Method not implemented.");
  }
  public async getUsers(input: string): Promise<DocumentType<User>[]> {
    return await getUsers(input);
  }
}
