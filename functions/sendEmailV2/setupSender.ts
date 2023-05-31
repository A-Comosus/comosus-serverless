import * as sgMail from "@sendgrid/mail";

export function setupSender() {
  sgMail.setApiKey(process.env.Sendgrid_API as string);

  return sgMail;
}
