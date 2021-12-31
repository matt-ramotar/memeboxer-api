import { GodAction } from "../../actions/models/GodAction";

export interface UserActivity {
  comments: GodAction[];
  reactions: GodAction[];
}
