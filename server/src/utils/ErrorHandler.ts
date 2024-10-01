class ErrorHandler extends Error {
    public statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
  
      // Maintain proper stack trace for debugging
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default ErrorHandler;
  