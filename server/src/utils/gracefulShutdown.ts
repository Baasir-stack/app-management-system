/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from 'http';

export const setupGracefulShutdown = (server: Server) => {
  process.on('unhandledRejection', (err: any) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => {
      process.exit(1); 
    });
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err: Error) => {
    console.error(`Uncaught Exception: ${err.message}`);
    process.exit(1); 
  });

  // Graceful shutdown on SIGTERM/SIGINT
  process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
      console.log('Process terminated.');
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    server.close(() => {
      console.log('Process terminated.');
    });
  });
};
