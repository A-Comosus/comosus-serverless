import { Handler } from "aws-lambda";
import * as AWS from "aws-sdk";

const s3 = new AWS.S3();

export const deleteFile: Handler = async event => {
  console.log("deleteFile event ...", event);

  const headers = {
    "content-type": "application/json",
  };

  try {
    const { body } = event;
    let requestBody = body;
    console.log("Validating type of request body....");
    if (typeof body !== "object") {
      console.log("Request body is not valid, transforming....");
      try {
        requestBody = JSON.parse(body);
      } catch (e) {
        console.error("Failed when transforming request body.", e);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify(
            {
              message: `Function errored when transforming request body to object. [typeof requestBody: ${typeof body}]`,
              requestBody,
            },
            null,
            2
          ),
        };
      }
    }
    console.log(`Request body is now valid [${typeof requestBody}]`);
    const { user_id } = requestBody;
    if (!user_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify(
          {
            message: `Function rejected due to incomplete request.`,
            requestBody: requestBody,
          },
          null,
          2
        ),
      };
    }

    const bucketName = process.env.BUCKET;
    const fileName = `${user_id}.jpg`;

    await s3
      .deleteObject({
        Bucket: bucketName,
        Key: fileName,
      } as AWS.S3.DeleteObjectRequest)
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
        file: `https://${bucketName}.s3.amazonaws.com/${fileName} deleted`,
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
