import aws from "aws-sdk";

export default async function uploadMeme(memeId: string, templateId: string, data: string): Promise<boolean> {
  try {
    aws.config.update({
      region: "us-east-2",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    const KEY = `${templateId}_${memeId}`;
    const S3_BUCKET = process.env.BUCKET;
    const CONTENT_ENCODING = "base64";
    const CONTENT_TYPE = "image/png";

    const bucket = new aws.S3({ params: { Bucket: S3_BUCKET } });

    const buffer = Buffer.from(data.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const object = {
      Key: KEY,
      Body: buffer,
      ContentEncoding: CONTENT_ENCODING,
      ContentType: CONTENT_TYPE,
      Bucket: S3_BUCKET!
    };

    bucket.putObject(object, (error) => {
      if (error) {
        throw error;
      }
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
