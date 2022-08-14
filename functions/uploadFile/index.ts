import { Handler } from "aws-lambda";
import * as AWS from "aws-sdk";
import * as parser from "lambda-multipart-parser";
import * as sharp from "sharp";

const s3 = new AWS.S3();

export const uploadFile: Handler = async event => {
  console.log("uploadFile event ...", event);
  const result = await parser.parse(event);
  console.log("Parsed event as result ...", result);

  const { user_id, width, height } = result;
  const { content } = result.files[0];

  try {
    const bucketName = process.env.BUCKET;
    const fileName = `${user_id}.jpg`;

    const buffer = await sharp(content)
      .resize(width ? parseInt(width) : 500, height ? parseInt(height) : 500)
      .toFormat("jpg")
      .jpeg({ quality: 90 })
      .toBuffer();

    await s3
      .putObject({
        Bucket: bucketName,
        Key: fileName,
        ACL: "public-read",
        Body: buffer,
      } as AWS.S3.PutObjectRequest)
      .promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin":
          "http://localhost:3000" ||
          "https://uat.a-comosus.link/" ||
          "https://a-comosus.link/",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        link: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
      }),
    };
  } catch (err) {
    const { message } = err as Error;
    console.log(
      "Upload File function error with unhandled exception...",
      message
    );
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Function errored when processing this request. ${message}`,
      }),
    };
  }
};
