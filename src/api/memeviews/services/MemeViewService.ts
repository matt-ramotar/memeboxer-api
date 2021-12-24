import { DocumentType } from "@typegoose/typegoose";
import { CreateMemeViewInput } from "../entities/CreateMemeViewInput";
import MemeView from "../models/MemeView";
import createMemeView from "./createMemeView";

interface MemeViewService {
  createMemeView(input: CreateMemeViewInput): Promise<DocumentType<MemeView>>;
}

export default class RealMemeViewService implements MemeViewService {
  public async createMemeView(input: CreateMemeViewInput): Promise<DocumentType<MemeView>> {
    return await createMemeView(input);
  }
}
