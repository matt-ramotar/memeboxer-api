import { NextFunction, Request, Response } from "express";

interface SlackService {
  handleChallenge(request: Request, response: Response, next: NextFunction): Promise<Response>;
}

export default class RealSlackService implements SlackService {
  public async handleChallenge(request: Request, response: Response, _: NextFunction): Promise<Response> {
    return response.json({ challenge: request.body.challenge });
  }
}
