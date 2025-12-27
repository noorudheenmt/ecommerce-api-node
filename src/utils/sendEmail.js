import nodemailer from "nodemailer";
import config from "#config/config.js";

// send email utility
export const sendEmail = async ({ to, subject, text, html }, log) => {
  try {
    // create transporter
    log("nodemailer.createTransport started");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.EMAIL_USERNAME,
        pass: config.EMAIL_PASSWORD,
      },
    });
    log("nodemailer.createTransport completed");

    const mailOptions = {
      from: config.EMAIL_USERNAME,
      to,
      subject,
      text: text || "",
      html: html || "",
    };

    // send email
    log("transporter.sendMail started");
    await transporter.sendMail(mailOptions);
    log("transporter.sendMail completed");

    log(`Email sent to ${to} with subject: ${subject}`);
  } catch (error) {
    log(error.stack, "error");
    throw new Error("Failed to send email");
  }
};
