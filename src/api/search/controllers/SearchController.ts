import { Body, Controller, Post, Route, Tags } from "tsoa";
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

    const searchResults: SearchResults = {
      memes,
      tags: [],
      users,
      comments: [],
      templates: []
    };

    return searchResults;
  }
}
