import mongoose from "mongoose";
import config from "#config/config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.DB_URI);
    console.log(`MongoDB connected (${config.NODE_ENV})`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
