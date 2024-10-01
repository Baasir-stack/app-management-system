import jwt from "jsonwebtoken";

export const createActivationToken = (userId: string, duration: string): string => {
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
      throw new Error("Missing JWT_SECRET environment variable");
    }
  
    return jwt.sign({ userId }, secret, {
      expiresIn: duration,
    });
  };