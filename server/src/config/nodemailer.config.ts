import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface MailSender {
  email: string;
  name: string;
}

export const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER as string, // Ensures it's typed as string
    pass: process.env.GMAIL_PASS as string, // Ensures it's typed as string (Gmail password or App password)
  },
});

export const sender: MailSender = {
  email: process.env.GMAIL_USER as string, // Ensures it's typed as string
  name: "Baasir",
};
