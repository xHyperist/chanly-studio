const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Gemini API Yapılandırması
// Not: API anahtarını process.env.GEMINI_API_KEY olarak tanımladığından emin ol
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/generate", async (req, res) => {
  try {
    const { niche } = req.body;

    const prompt = `
      You are a viral content creator.
      
      Create TikTok/Reels content for: ${niche}
      
      Return:
      1. Hook (first 3 seconds)
      2. Script
      3. Caption
      4. Hashtags
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      result: text
    });
  } catch (error) {
    console.error("Hata oluştu:", error);
    res.status(500).json({ error: "İçerik üretilirken bir hata oluştu." });
  }
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
