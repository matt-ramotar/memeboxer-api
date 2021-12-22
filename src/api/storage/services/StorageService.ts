import { NextFunction, Request, Response } from "express";
import { StorageResponse } from "../entities/responses";
import getSignedUrl from "./getSignedUrl";
import uploadMeme from "./uploadMeme";
import uploadPng from "./uploadPng";

interface StorageService {
  uploadPng(request: Request, response: Response, next: NextFunction): Promise<Response<StorageResponse> | void>;
  uploadMeme(memeId: string, templateId: string, data: string): Promise<boolean>;
  getSignedUrl(request: Request, response: Response, next: NextFunction): Promise<Response<StorageResponse> | void>;
}

export default class RealStorageService implements StorageService {
  public async uploadPng(request: Request, response: Response, next: NextFunction): Promise<Response<StorageResponse> | void> {
    return await uploadPng(request, response, next);
  }

  public async getSignedUrl(request: Request, response: Response, next: NextFunction): Promise<Response<StorageResponse> | void> {
    return await getSignedUrl(request, response, next);
  }

  public async uploadMeme(memeId: string, templateId: string, data: string): Promise<boolean> {
    return await uploadMeme(memeId, templateId, data);
  }
}
