import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateTokenAndSetCookie = (res: Response, userId: string): string => {
  // Generate the token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  // Set the token in a cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });

  return token;
};
