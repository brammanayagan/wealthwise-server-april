const getFallbackInsights = () => {
  return "AI not configured. Basic advice: Diversify your portfolio, avoid over-concentration, and review performance regularly.";
};

export const generateInsights = async (assets) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return getFallbackInsights();
    }

    const prompt = `
    Analyze this portfolio and give simple insights:
    ${JSON.stringify(assets)}
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    return data.choices?.[0]?.message?.content || getFallbackInsights();
  } catch (error) {
    return getFallbackInsights();
  }
};

export const explainAsset = async (asset) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return "AI not configured. This asset represents an investment holding.";
    }

    const prompt = `
    Explain this asset in simple terms:
    ${JSON.stringify(asset)}
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    return data.choices?.[0]?.message?.content || "No explanation available";
  } catch (error) {
    return "AI failed. Try again later.";
  }
};
