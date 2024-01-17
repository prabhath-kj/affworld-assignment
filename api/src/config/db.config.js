import mongoose from "mongoose"
import {config} from "dotenv"
config()


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;