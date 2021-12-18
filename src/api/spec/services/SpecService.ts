import { NextFunction, Request, Response } from "express";
import get from "./get";

interface SpecService {
  getSpec(request: Request, response: Response, next: NextFunction): Promise<Response>;
}

export default class RealSpecService implements SpecService {
  public async getSpec(request: Request, response: Response, next: NextFunction): Promise<Response> {
    return get(request, response, next);
  }
}
