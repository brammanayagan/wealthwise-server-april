// Import OpenAI SDK
import OpenAI from "openai";

// Initialize client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// =========================
// GENERATE PORTFOLIO INSIGHT
// =========================
export const generatePortfolioInsight = async (assets = []) => {
  try {
    // Basic validation
    if (!assets || assets.length === 0) {
      return "No assets available to analyze.";
    }

    // Clean & limit data (avoid sending unnecessary data)
    const cleanAssets = assets.map((a) => ({
      name: a.name,
      type: a.type,
      quantity: a.quantity,
      buyPrice: a.buyPrice,
      currentPrice: a.currentPrice,
    }));

    // Prompt (controlled + simple)
    const prompt = `
You are a financial assistant.

Analyze the following portfolio and respond in EXACT format:

Risk: <Low/Medium/High>
Suggestion: <One short actionable suggestion>

Portfolio:
${JSON.stringify(cleanAssets)}
`;

    // Call OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 150,
      temperature: 0.5,
    });

    // Extract AI response safely
    const insight =
      response?.choices?.[0]?.message?.content ||
      "Unable to generate insight at the moment.";

    return insight;
  } catch (error) {
    console.error("OpenAI error:", error.message);

    // Fail-safe fallback (important)
    return "Insight unavailable. Please try again later.";
  }
};
