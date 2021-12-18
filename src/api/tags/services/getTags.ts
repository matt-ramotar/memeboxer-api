import { TagModel } from "../../../models";
import Tag from "../models/Tag";

export default async function getTags(): Promise<Tag[]> {
  try {
    const pojos = [];
    const tags = await TagModel.find();
    for (const tag of tags) {
      pojos.push(await tag.toPojo());
    }
    return pojos;
  } catch (error) {
    throw error;
  }
}
