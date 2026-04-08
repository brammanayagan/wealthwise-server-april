import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getAssets,
  createAsset,
  updateAsset,
  deleteAsset,
} from "../controllers/assetController.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getAssets).post(createAsset);

router.route("/:id").put(updateAsset).delete(deleteAsset);

export default router;
