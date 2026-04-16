// Import express
import express from "express";

// Import controller
import { getPortfolioInsights } from "../controllers/aiController.js";

// Import auth middleware
import { protect } from "../middleware/authMiddleware.js";

// Initialize router
const router = express.Router();

// =========================
// PROTECTED AI ROUTE
// =========================

// Generate portfolio insights
router.post("/insights", protect, getPortfolioInsights);

// Export router
export default router;
