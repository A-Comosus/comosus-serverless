import * as sgMail from "@sendgrid/mail";

export function setupSender() {
  sgMail.setApiKey(process.env.SENDGRID_API as string);

  return sgMail;
}
