import { Handler } from "aws-lambda";
import * as nodemailer from "nodemailer";

export const sendEmail: Handler = async (event: any) => {
  const headers = {
    "content-type": "application/json",
  };

  try {
    console.log(event);
    const { body } = event;
    let requestBody = body;
    if (typeof body !== "object") {
      requestBody = JSON.parse(body);
    }
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

    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 465,
      secure: true,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    transporter.verify(async (error, success) => {
      if (error) {
        console.error("Error when setting up sender: ", error);
      }
      if (success) {
        console.log("Sender is verified and ready to send email.");
        await transporter
          .sendMail({
            from: '"A-COMOSUS 🍍" <project.a.comosus@gmail.com>',
            ...requestBody,
          })
          .then(() => {
            console.log(`Email sent to ${to} successfully!`);
          })
          .catch(err => {
            console.error(`Failed to send email with ${err}`);
          });
      }
    });
  } catch (err) {
    console.log("err!", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: `Function errored when processing this request.${err}`,
      }),
    };
  }
};
