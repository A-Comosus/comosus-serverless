import { Handler } from "aws-lambda";
import { setupSender } from "./setupSender";

export const sendEmail: Handler = async (event: any) => {
  const headers = {
    "content-type": "application/json",
  };

  try {
    console.log("Receiving request to send email....");
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
    const { to, subject, text, html } = requestBody;
    if (!to || !subject || !text || !html) {
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

    const transporter = setupSender();
    transporter.verify((error) => {
      if (error) {
        throw new Error(`Error when setting up sender: ${error}`);
      }
    });

    console.log("Sender is verified and ready to send email.");

    const result = await transporter.sendMail({
      from: '"A-COMOSUS 🍍" <project.a.comosus@gmail.com>',
      ...requestBody,
    });
    console.log(`Email sent to ${to} successfully!`);
    console.log(`Operation Info`, result);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: `Email sent to ${to} successfully!`,
      }),
    };
  } catch (err) {
    console.log("Function error with unhandled exception...", err.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: `Function errored when processing this request. ${err.message}`,
      }),
    };
  }
};
