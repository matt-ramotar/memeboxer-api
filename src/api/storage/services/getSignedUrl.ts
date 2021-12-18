import aws from "aws-sdk";
import { NextFunction, Request, Response } from "express";
import { StorageResponse } from "../entities/responses";

export default async function getSignedUrl(request: Request, response: Response, _: NextFunction): Promise<Response<StorageResponse> | void> {
  try {
    const { key } = request.params;
    console.log(request);

    aws.config.update({
      region: "us-east-2",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    const S3_BUCKET = process.env.BUCKET;
    const params = { Bucket: S3_BUCKET, Key: key };

    const s3 = new aws.S3();

    s3.getSignedUrlPromise("getObject", params).then((url) => {
      return response.json({ success: true, data: url });
    });
  } catch (error) {
    console.log(error);
    return response.json({ success: false, data: {} });
  }
}
