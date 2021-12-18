import { NextFunction, Request, Response } from "express";
import spec from "../../../../build/swagger.json";

export default async function getSpec(_: Request, response: Response, __: NextFunction): Promise<Response> {
  return response.json(spec);
}
