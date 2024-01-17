import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/db.config.js";
import authRoutes from "./routes/auth.js"
import secretRoutes from "./routes/secret.js"
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
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("short"));

// Routes
app.use("/api/auth",authRoutes)
app.use("/api/secrets",secretRoutes)


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: err.message,
  });
});

export default app;