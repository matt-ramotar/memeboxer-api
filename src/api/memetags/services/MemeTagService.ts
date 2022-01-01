import { DocumentType } from "@typegoose/typegoose";
import { CreateMemeTagInput } from "../entities/CreateMemeTagInput";
import MemeTag from "../models/MemeTag";
import createMemeTag from "./createMemeTag";

interface MemeTagService {
  createMemeTag(input: CreateMemeTagInput): Promise<DocumentType<MemeTag>>;
}

export default class RealMemeTagService implements MemeTagService {
  public async createMemeTag(input: CreateMemeTagInput): Promise<DocumentType<MemeTag>> {
    return await createMemeTag(input);
  }
}
