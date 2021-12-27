import Comment from "../../comments/models/Comment";
import Meme from "../../memes/models/Meme";
import Tag from "../../tags/models/Tag";
import Template from "../../templates/models/Template";
import User from "../../users/models/User";

export interface SearchResults {
  memes: Meme[];
  tags: Tag[];
  users: User[];
  comments: Comment[];
  templates: Template[];
}
