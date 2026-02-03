const axios = require("axios");
const https = require("https");

const STOCK_API_URL = "https://finnhub.io/api/v1/quote";

// 🔥 FORCE IPV4
const agent = new https.Agent({
  family: 4,
});

exports.getStock = async (req, res) => {
  const { symbol } = req.params;

  if (!symbol || symbol.length < 2) {
    return res.status(400).json({ error: "Invalid stock symbol" });
  }

  if (!process.env.STOCK_API_KEY) {
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  try {
    const response = await axios.get(STOCK_API_URL, {
      params: {
        symbol,
        token: process.env.STOCK_API_KEY,
      },
      httpsAgent: agent, // ✅ KEY FIX
    });

    if (!response.data || response.data.c === 0) {
      return res.status(404).json({ error: "Stock data not available" });
    }

    res.json(response.data);
  } catch (error) {
    console.error("Finnhub API error:", error.message);
    res.status(502).json({ error: "Upstream stock API failed" });
  }
};
