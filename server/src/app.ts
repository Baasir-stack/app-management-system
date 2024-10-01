import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; 
import authRoutes from "./routes/auth.route";
import appRoutes from "./routes/app.route";
import subscriptionRoutes from "./routes/subscription.route";
import userRoutes from "./routes/user.route";
import errorMiddleware from "./middlewares/error"; 

const app: Application = express();

const corsOptions = {
    origin: 'http://localhost:3000', // Frontend origin
    credentials: true, // This allows the cookies/credentials to be sent
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

// Error handling middleware
app.use(errorMiddleware);

export default app;
