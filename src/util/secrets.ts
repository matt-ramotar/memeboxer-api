import dotenv from "dotenv";
import fs from "fs";
import logger from "./logger";

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables.");
  dotenv.config({ path: ".env" });
}

export const ENVIRONMENT = process.env.NODE_ENV;
export const MONGODB_URI = process.env["MONGODB_URI"];
export const KEYS = process.env.SECRET_OR_KEY;
export const ROOT_AWS_S3 = process.env.ROOT_AWS_S3;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const DBX_REFRESH_TOKEN = process.env.DBX_REFRESH_TOKEN;
