import { Request, Response } from "express";
import User from "../models/user.model"; // Adjust the path accordingly
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie"; // Adjust the path accordingly
import ErrorHandler from "../utils/ErrorHandler"; // Adjust the path accordingly
import {  IUser } from "../interfaces/user.interface";
import { uploadImageToCloudinary } from '../utils/handlingAvatar';
import catchAsyncError from "../middlewares/catchAsyncError";
import { sendPasswordResetEmail, sendResetSuccessEmail } from "../utils/emailHelperFunction";
import { createActivationToken } from "../utils/generateToken";



// Type guard for error handling
const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return (error as { message: string }).message !== undefined;
};


/**
 * @desc    register user
 * @route   POST /api/auth/register
 * @access  Public
*/


export const registerUser = catchAsyncError(async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

 
  if (await User.isEmailTaken(email)) {
    return res.status(400).json({ message: "Email is already taken." });
  }

  let avatarUrl = '';

  
  if (req.file) {
    avatarUrl = await uploadImageToCloudinary(req.file.buffer); 
  }

  // Create new user
  const newUser = new User({ firstName, lastName, email, password, avatar: avatarUrl });
  await newUser.save();


  res.status(201).json({
    success: true,
    message: "User registered successfully.",
    user: {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      avatar: avatarUrl, // Use the URL from Cloudinary
    },
  });
});


/**
 * @desc    login user
 * @route   POST /api/auth/login
 * @access  Public
*/


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email }) as IUser;

    const passwordMatched = await user.isPasswordMatch(password)

  
  
    if (!user || !(passwordMatched)) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    generateTokenAndSetCookie(res, user._id as string);

 

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        id:user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        status:user.status,
        role:user.role,
        created_at: user.createdAt,
      },
    });
  } catch (error) {
    if (isErrorWithMessage(error)) {
      throw new ErrorHandler(error.message, 500);
    }
    throw new ErrorHandler("Internal Server Error", 500);
  }
};


/**
 * @desc    forgot password
 * @route   POST /api/auth/forget-password
 * @access  Public
*/


export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    
    const resetToken = createActivationToken(user._id as string, "10m");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiry
    
    await user.save();
    
    // Send reset email with token
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    
    res.status(200).json({
      success: true,
      message: "Password reset link has been sent to your email.",
    });
  } catch (error) {
    if (isErrorWithMessage(error)) {
      throw new ErrorHandler(error.message, 500);
    }
    throw new ErrorHandler("Internal Server Error", 500);
  }
};


/**
 * @desc    reset password
 * @route   POST /api/auth/reset-password/:token
 * @access  Public
*/

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;


    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

  
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: new Date() }, 
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token.",
      });
    }

   
    user.password = password;


    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save(); 

   
    await sendResetSuccessEmail(user.email);

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    if (isErrorWithMessage(error)) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



/**
 * @desc    Logout user (clears auth cookie)
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logoutUser = catchAsyncError(async (req: Request, res: Response) => {
  try {
    // Clear the JWT cookie by setting its expiry to a past date
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // Expire the cookie immediately
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Configure SameSite for CSRF protection
      secure: process.env.NODE_ENV === "production", // Secure flag to send cookie only over HTTPS
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {

    if (isErrorWithMessage(error)) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    throw new ErrorHandler("Logout failed", 500);
  }
});