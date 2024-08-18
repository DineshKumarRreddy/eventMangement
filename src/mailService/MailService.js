import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();

export class MailService {
  constructor(
    host = "smtp.gmail.com",
    port = 587,
    secure = false,
    user = process.env.EMAIL_USER,
    pass = process.env.EMAIL_PASS
  ) {
    this.user = user;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });
  }

  async sendMail({ to, subject, text, html } = {}) {
    const mailOptions = {
      from: this.user,
      to,
      subject,
      html,
    };

    const info = await this.transporter.sendMail(mailOptions);
    return info;
  }
}
