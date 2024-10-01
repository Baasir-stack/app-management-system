import {  Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IRequestUser } from '../../src/interfaces/user.interface';

export const verifyToken = (req: IRequestUser, res: Response, next: NextFunction) => {
    const token = req.cookies.token;



  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized - no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string); // Ensure JWT_SECRET is a string

    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Unauthorized - invalid token' });
    }

    const userId = (decoded as { userId: string }).userId;
    
   



    req.userId = userId // Cast decoded to the expected type
    next();
  } catch (error) {
    console.log('Error in verifyToken', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
