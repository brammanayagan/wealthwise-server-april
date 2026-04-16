// Import express
import express from "express";

// Import controller functions
import { register, login } from "../controllers/authController.js";

// Initialize router
const router = express.Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Export router
export default router;
