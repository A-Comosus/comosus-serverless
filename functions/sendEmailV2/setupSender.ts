import sgMail from "@sendgrid/mail";

export function setupSender() {
  console.log(sgMail);
  console.log(process.env.SENDGRID_API_KEY);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  return sgMail;
}
