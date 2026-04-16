import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Success log
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // Failure log
    console.error("MongoDB connection failed:", error.message);

    // Exit process (critical failure)
    process.exit(1);
  }
};

export default connectDB;
