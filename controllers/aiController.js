import Asset from "../models/Asset.js";
import { generateInsights, explainAsset } from "../services/aiService.js";

// @route POST /api/ai/insights
export const getInsights = async (req, res) => {
  try {
    const assets = await Asset.find({ userId: req.user._id });

    const insights = await generateInsights(assets);

    res.json({ insights });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @route POST /api/ai/explain
export const explain = async (req, res) => {
  try {
    const { asset } = req.body;

    const explanation = await explainAsset(asset);

    res.json({ explanation });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
