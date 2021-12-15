import { NextFunction, Request, Response } from "express";
import { UnsuccessfulAuth } from "../entities/errors";
import { ContinueWithGoogleSuccess, SuccessfulAuth } from "../entities/responses";
import continueWithGoogle from "./continueWithGoogle";
import validateToken from "./validateToken";

interface AuthService {
  continueWithGoogle(request: Request, response: Response, next: NextFunction): Promise<Response<ContinueWithGoogleSuccess>>;

  validateToken(request: Request, response: Response, next: NextFunction): Promise<Response<SuccessfulAuth | UnsuccessfulAuth>>;
}

export default class RealAuthService implements AuthService {
  public async continueWithGoogle(request: Request, response: Response, next: NextFunction): Promise<Response<ContinueWithGoogleSuccess>> {
    return await continueWithGoogle(request, response, next);
  }

  public async validateToken(request: Request, response: Response, next: NextFunction): Promise<Response<SuccessfulAuth | UnsuccessfulAuth>> {
    return await validateToken(request, response, next);
  }
}
