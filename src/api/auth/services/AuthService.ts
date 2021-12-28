import { NextFunction, Request, Response } from "express";
import { UnsuccessfulAuth } from "../entities/errors";
import { ContinueWithGoogleSuccess, SuccessfulAuth } from "../entities/responses";
import canDeleteMeme from "./canDeleteMeme";
import canDeleteMemeReaction from "./canDeleteMemeReaction";
import continueWithGoogle from "./continueWithGoogle";
import validateToken from "./validateToken";

interface AuthService {
  continueWithGoogle(request: Request, response: Response, next: NextFunction): Promise<Response<ContinueWithGoogleSuccess>>;
  validateToken(request: Request, response: Response, next: NextFunction): Promise<Response<SuccessfulAuth | UnsuccessfulAuth>>;
  canDeleteMeme(userId: string, memeId: string, token: string): Promise<boolean>;
  canDeleteComment(userId: string, commentId: string, token: string): Promise<boolean>;
  canDeleteMemeReaction(userId: string, memeReactionId: string, token: string): Promise<boolean>;
}

export default class RealAuthService implements AuthService {
  public async continueWithGoogle(request: Request, response: Response, next: NextFunction): Promise<Response<ContinueWithGoogleSuccess>> {
    return await continueWithGoogle(request, response, next);
  }

  public async validateToken(request: Request, response: Response, next: NextFunction): Promise<Response<SuccessfulAuth | UnsuccessfulAuth>> {
    return await validateToken(request, response, next);
  }

  public async canDeleteMeme(userId: string, memeId: string, token: string): Promise<boolean> {
    return await canDeleteMeme(userId, memeId, token);
  }

  public async canDeleteComment(userId: string, commentId: string, token: string): Promise<boolean> {
    return await canDeleteMeme(userId, commentId, token);
  }

  public async canDeleteMemeReaction(userId: string, memeReactionId: string, token: string): Promise<boolean> {
    return await canDeleteMemeReaction(userId, memeReactionId, token);
  }
}
