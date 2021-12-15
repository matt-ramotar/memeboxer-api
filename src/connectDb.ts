import { connect } from "mongoose";
import { MONGODB_URI } from "./util/secrets";

export default async function connectDb() {
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  await connect(MONGODB_URI!, options);
}
