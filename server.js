const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/generate", async (req, res) => {
  const { niche } = req.body;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `
You are a viral content creator.

Create TikTok/Reels content for: ${niche}

Return:
1. Hook (first 3 seconds)
2. Script
3. Caption
4. Hashtags
        `
      }
    ]
  });

  res.json({
    result: response.choices[0].message.content
  });
});

app.listen(3000, () => {
  console.log("Server running");
});

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); // ❗ ÇOK ÖNEMLİ

app.post("/generate", async (req, res) => {
  res.json({ result: "test ok" });
});

// ❗ PORT BURASI KRİTİK
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
