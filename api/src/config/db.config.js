import mongoose from "mongoose";
import { config } from "dotenv";
config();

const url = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
    });

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;
