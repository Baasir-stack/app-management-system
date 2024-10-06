import app from './app';
import { connectDB } from './config/db';
import { setupGracefulShutdown } from './utils/gracefulShutdown';
import { loadEnvironment } from './utils/env';
import dotEnv from 'dotenv';

dotEnv.config({
    path: '.env',
});

// Load environment variables
loadEnvironment();

// Define the port from environment variables
const PORT = process.env.PORT || 8000;


// Start the server with a DB connection
const startServer = async () => {
  try {
    await connectDB();
    
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Handle graceful shutdown
    setupGracefulShutdown(server);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
