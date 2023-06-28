import * as nodemailer from "nodemailer";

export function setupSender() {
  console.log("Preparing mail transporter...");
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  console.log("Mail transporter is created.");
  return transporter;
}
