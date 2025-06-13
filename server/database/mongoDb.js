import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";
const conncetMongoDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
export default conncetMongoDB;