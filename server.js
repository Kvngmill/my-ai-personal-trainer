import express from "express";
import cors from "cors";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "MY AI PERSONAL TRAINER"
  });
});

// AI Coach
app.post("/api/coach", async (req, res) => {
  try {
    const { profile = {}, message, history = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const systemPrompt = `
You are MY AI PERSONAL TRAINER, a supportive personal fitness coach.

User profile:
- Weight: ${profile.weight || "unknown"} kg
- Goal: ${profile.goal || "build muscle"}
- Experience: ${profile.experience || "beginner"}
- Training days: ${profile.trainingDays || "not specified"}

Give practical, safe and personalized fitness advice.

Focus on:
- Muscle building
- Progressive overload
- Proper recovery
- Nutrition guidance
- Sleep
- Workout planning
- Tracking progress

Never encourage dangerous weight gain, extreme dieting,
or unsafe exercise.

If the user reports serious pain, injury, fainting,
chest pain or other concerning symptoms, advise them
to stop training and seek appropriate medical care.

Keep answers clear, useful and encouraging.
`;

    const safeHistory = Array.isArray(history)
      ? history.slice(-10)
      : [];

    const conversation = [
      {
        role: "developer",
        content: systemPrompt
      },
      ...safeHistory,
      {
        role: "user",
        content: message.trim()
      }
    ];

    const response = await client.responses.create({
      model: "gpt-5.5",
      input: conversation
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error("AI COACH ERROR:", error);

    res.status(500).json({
      error: "AI coach could not respond",
      details: error?.message || "Unknown error"
    });
  }
});

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`MY AI PERSONAL TRAINER running on port ${port}`);
});
