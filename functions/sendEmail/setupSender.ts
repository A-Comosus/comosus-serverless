import * as nodemailer from "nodemailer";

export function setupSender() {
  console.log("Preparing mail transporter...");
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true,
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  console.log("Mail transporter is created.");
  return transporter;
}
