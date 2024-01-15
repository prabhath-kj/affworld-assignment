import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/db.config.js";
import authRoutes from "./routes/auth.js"
import {config} from "dotenv";
const app = express();
config();


// Connect to the database
connectDB();

// Middleware
app.use(helmet()); // Use Helmet middleware for enhanced security headers
app.use(
  cors({
    credentials: true,
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("short"));

// Routes
app.use("/api/auth",authRoutes)


export default app;