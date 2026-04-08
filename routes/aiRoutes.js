import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getInsights, explain } from "../controllers/aiController.js";

const router = express.Router();

router.use(protect);

router.post("/insights", getInsights);
router.post("/explain", explain);

export default router;
