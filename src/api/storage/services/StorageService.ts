import { NextFunction, Request, Response } from "express";
import { StorageResponse } from "../entities/responses";
import getSignedUrl from "./getSignedUrl";
import uploadPng from "./uploadPng";

interface StorageService {
  uploadPng(request: Request, response: Response, next: NextFunction): Promise<Response<StorageResponse> | void>;
  getSignedUrl(request: Request, response: Response, next: NextFunction): Promise<Response<StorageResponse> | void>;
}

export default class RealStorageService implements StorageService {
  public async uploadPng(request: Request, response: Response, next: NextFunction): Promise<Response<StorageResponse> | void> {
    return await uploadPng(request, response, next);
  }

  public async getSignedUrl(request: Request, response: Response, next: NextFunction): Promise<Response<StorageResponse> | void> {
    return await getSignedUrl(request, response, next);
  }
}
