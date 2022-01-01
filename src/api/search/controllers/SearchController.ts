import { Body, Controller, Post, Route, Tags } from "tsoa";
import User from "../../users/models/User";
import SearchInput from "../entities/SearchInput";
import { SearchResults } from "../entities/SearchResults";
import RealSearchService from "../services/SearchService";

@Route("search")
@Tags("Search")
export class SearchController extends Controller {
  @Post()
  async search(@Body() input: SearchInput): Promise<SearchResults> {
    const searchService = new RealSearchService();

    const users = await searchService.getUsers(input.input);
    const memes = await searchService.getMemes(input.input);
    const comments = await searchService.getComments(input.input);
    const tags = await searchService.getTags(input.input);
    const templates = await searchService.getTemplates(input.input);

    const searchResults: SearchResults = {
      memes,
      tags,
      users,
      comments,
      templates
    };

    return searchResults;
  }

  @Post("users")
  async getUsers(@Body() input: SearchInput): Promise<User[]> {
    const searchService = new RealSearchService();

    const users = await searchService.getUsers(input.input);

    return users;
  }
}
