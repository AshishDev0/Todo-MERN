import mongoose from "mongoose";
import { AppError } from "../types/error.types";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw new AppError(500, "Database connection failed");
  }
};
