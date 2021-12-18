import { Body, Controller, Post, Route, Tags } from "tsoa";
import { GodMeme } from "../../memes/models/GodMeme";
import RealMemeService from "../../memes/services/MemeService";
import SearchInput from "../entities/SearchInput";

@Route("search")
@Tags("Search")
export class SearchController extends Controller {
  @Post()
  async search(@Body() input: SearchInput): Promise<GodMeme[]> {
    const { keyword, title, user, tags } = input;
    return await new RealMemeService().getBestMemes(keyword, title, user, tags);
  }
}
