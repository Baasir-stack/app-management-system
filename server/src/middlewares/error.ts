/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/ErrorHandler'; 


interface CustomError extends Error {
  statusCode?: number;
  isJoi?: boolean; 
  code?: number; 
  details?: { message: string }[]; 
  path?: string; 
  keyValue?: { [key: string]: string | number }; 
}

const errorMiddleware = (err: CustomError, req: Request, res: Response,next: NextFunction) => {

  if (!err.statusCode) {
    console.log("req.body",req.body)
    err = new ErrorHandler("Resource not found.", 404);
  }


 
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      message: err.message,
      details: err.details,
    });
  }


  


 
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';


  if (err.name === 'CastError') {
    const message = `Resource not found with this ID. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

 
  if (err.code === 11000) {
    const message = `Duplicate key ${
      err.keyValue ? Object.keys(err.keyValue).join(', ') : 'entered'
    } entered.`; // Check if keyValue is defined
    err = new ErrorHandler(message, 400);
  }

 
  if (err.name === 'JsonWebTokenError') {
    const message = `Your URL is invalid; please try again later.`;
    err = new ErrorHandler(message, 400);
  }

  
  if (err.name === 'TokenExpiredError') {
    const message = `Your URL has expired; please try again later.`;
    err = new ErrorHandler(message, 400);
  }

 
  res.status(err.statusCode!).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
