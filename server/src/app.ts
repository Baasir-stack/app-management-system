import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; 
import authRoutes from "./routes/auth.route";
import appRoutes from "./routes/app.route";
import subscriptionRoutes from "./routes/subscription.route";
import userRoutes from "./routes/user.route";
import subscriptionPlan from "./routes/subscription.plan.route";
import errorMiddleware from "./middlewares/error"; 

const app: Application = express();

const corsOptions = {
    origin: process.env.REACT_APP_URL, 
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

export default app;
