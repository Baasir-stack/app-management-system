
import { transporter, sender } from "../config/nodemailer.config";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplate";

// Define types for the email and resetURL parameters
export const sendPasswordResetEmail = async (email: string, resetURL: string): Promise<void> => {
    const mailOptions = {
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    };
  
    try {
      const response = await transporter.sendMail(mailOptions);
      console.log("Password reset email sent successfully", response);
    } catch (error) {
      console.error(`Error sending password reset email`, error);
      throw new Error(`Error sending password reset email: ${(error as Error).message}`);
    }
};
  
  // Define type for the email parameter
  export const sendResetSuccessEmail = async (email: string): Promise<void> => {
    const mailOptions = {
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    };
  
    try {
      const response = await transporter.sendMail(mailOptions);
      console.log("Password reset success email sent successfully", response);
    } catch (error) {
      console.error(`Error sending password reset success email`, error);
      throw new Error(`Error sending password reset success email: ${(error as Error).message}`);
    }
  };