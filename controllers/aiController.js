// Import service
import { generatePortfolioInsight } from "../services/aiService.js";

// Import response helpers
import { success, error } from "../utils/response.js";

// =========================
// GET AI INSIGHTS
// =========================
export const getPortfolioInsights = async (req, res) => {
  try {
    // Extract assets from request body
    const { assets } = req.body;

    // Validation
    if (!assets || !Array.isArray(assets)) {
      return error(res, "Valid assets array is required", 400);
    }

    // Call AI service
    const insight = await generatePortfolioInsight(assets);

    // Send response
    return success(res, { insight }, "Insight generated");
  } catch (err) {
    // Fail-safe response (do NOT break API)
    return error(res, "Failed to generate insight");
  }
};
