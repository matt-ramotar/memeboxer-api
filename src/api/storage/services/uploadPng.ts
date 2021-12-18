import aws from "aws-sdk";
import { NextFunction, Request, Response } from "express";
import { StorageResponse } from "../entities/responses";

export default async function uploadPng(request: Request, response: Response, _: NextFunction): Promise<Response<StorageResponse> | void> {
  try {
    const { key, content, contentEncoding, contentType } = request.body;

    aws.config.update({
      region: "us-east-2",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    const S3_BUCKET = process.env.BUCKET;
    const bucket = new aws.S3({ params: { Bucket: S3_BUCKET } });

    const buffer = Buffer.from(content.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const object = {
      Key: key,
      Body: buffer,
      ContentEncoding: contentEncoding,
      ContentType: contentType,
      Bucket: S3_BUCKET!
    };

    bucket.putObject(object, (error, result) => {
      if (error) {
        throw error;
      }
      return response.json({ sucess: true, data: result });
    });
  } catch (error) {
    console.log(error);
    return response.json({ success: false, data: {} });
  }
}
