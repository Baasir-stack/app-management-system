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
    user: process.env.GMAIL_USER as string, 
    pass: process.env.GMAIL_PASS as string, 
  },
});

export const sender: MailSender = {
  email: process.env.GMAIL_USER as string, 
  name: "Baasir",
};
