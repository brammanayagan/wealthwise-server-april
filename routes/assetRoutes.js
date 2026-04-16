// Import express
import express from "express";

// Import controller functions
import {
  createAsset,
  getAssets,
  updateAsset,
  deleteAsset,
} from "../controllers/assetController.js";

// Import auth middleware
import { protect } from "../middleware/authMiddleware.js";

// Initialize router
const router = express.Router();

// =========================
// PROTECTED ROUTES
// =========================

// Create asset
router.post("/", protect, createAsset);

// Get all assets (with pagination + filter)
router.get("/", protect, getAssets);

// Update asset
router.put("/:id", protect, updateAsset);

// Delete asset
router.delete("/:id", protect, deleteAsset);

// Export router
export default router;
