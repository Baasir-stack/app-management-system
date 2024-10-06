import { connectDB } from './config/db';
import { setupGracefulShutdown } from './utils/gracefulShutdown';
import { loadEnvironment } from './utils/env';
import dotEnv from 'dotenv';
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; 
import authRoutes from "./routes/auth.route";
import appRoutes from "./routes/app.route";
import subscriptionRoutes from "./routes/subscription.route";
import userRoutes from "./routes/user.route";
import subscriptionPlan from "./routes/subscription.plan.route";
import errorMiddleware from "./middlewares/error"; 

dotEnv.config({
    path: '.env',
});

// Load environment variables
loadEnvironment();

// Define the port from environment variables
const PORT = process.env.PORT || 8000;



const app: Application = express();

const corsOptions = {
    origin: process.env.CLIENT_URL, 
    credentials: true, 
  }

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/app", appRoutes);
app.use('/api/subs', subscriptionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subs-plan', subscriptionPlan);

// Error handling middleware
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

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
