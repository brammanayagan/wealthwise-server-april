// Import core packages
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Import DB connection
import connectDB from "./config/db.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import assetRoutes from "./routes/assetRoutes.js";
// import aiRoutes from "./routes/aiRoutes.js";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/portfolio", assetRoutes);
// app.use("/api/portfolio", aiRoutes); // AI endpoint under portfolio

// Start server
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

// Execute
startServer();
