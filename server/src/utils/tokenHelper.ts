/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt, { JwtPayload } from "jsonwebtoken";
import { Response } from "express";

export const createActivationToken = (userId: string, duration: string): string => {
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
      throw new Error("Missing JWT_SECRET environment variable");
    }
  
    return jwt.sign({ userId }, secret, {
      expiresIn: duration,
    });
  };

  export const generateTokenAndSetCookie = (res: Response, userId: string): string => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
  
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
  
    return token;
  };


  export const validateToken = (token: string): string => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("Missing JWT_SECRET environment variable");
    }

    try {
        
        const decoded = jwt.verify(token, secret) as JwtPayload;

  
        if (!decoded.userId) {
            throw new Error("Invalid token payload: userId not found");
        }

        return decoded.userId; 
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};