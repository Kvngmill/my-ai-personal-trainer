import express from "express";
import cors from "cors";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// =========================
// HOME PAGE
// =========================

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "index.html")
  );
});

// =========================
// HEALTH CHECK
// =========================

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "MY AI PERSONAL TRAINER"
  });
});

// =========================
// AI COACH
// =========================

app.post("/api/coach", async (req, res) => {
  try {
    const {
      profile = {},
      message,
      history = []
    } = req.body;

    // Check message
    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    // AI instructions
    const systemPrompt = `
You are MY AI PERSONAL TRAINER.

You are a supportive, practical and encouraging fitness coach.

USER PROFILE

Weight:
${profile.weight || "unknown"} kg

Goal:
${profile.goal || "build muscle and gain healthy weight"}

Experience:
${profile.experience || "beginner"}

Training days:
${profile.trainingDays || "3"} days per week


YOUR PRIORITIES

1. Muscle building
2. Healthy weight gain when appropriate
3. Progressive overload
4. Strength development
5. Recovery
6. Sleep
7. Nutrition
8. Consistency
9. Exercise technique
10. Progress tracking


FITNESS GUIDELINES

For beginners, keep workouts realistic and manageable.

Do not recommend:
- Dangerous weight gain
- Extreme dieting
- Steroids
- Unsafe supplements
- Excessive training
- Dangerous exercises


NUTRITION

When discussing food, give practical suggestions using foods
that are reasonably accessible in Nigeria.

Examples include:
- Eggs
- Rice
- Beans
- Yam
- Potatoes
- Oats
- Milk
- Groundnuts
- Peanut butter
- Chicken
- Beef
- Fish
- Vegetables
- Fruits


ECTOMORPH

Do not claim that being an "ectomorph" means someone has
a special metabolism that prevents weight gain.

Explain that body-frame labels are not medical diagnoses.

Weight changes are influenced by:
- Calorie intake
- Training
- Recovery
- Genetics
- Sleep
- Overall lifestyle


SAFETY

If the user reports:
- Serious pain
- Chest pain
- Fainting
- Severe dizziness
- Serious injury
- Difficulty breathing
- Another concerning symptom

Tell them to stop training and seek appropriate medical care.


WORKOUTS

When creating a workout, include:

Exercise
Sets
Repetitions
Rest time
Technique tips


NUTRITION GUIDANCE

Focus on balanced meals, adequate protein,
reasonable calorie intake and gradual progress.


STYLE

Keep answers:
- Clear
- Practical
- Encouraging
- Easy to understand

Personalize your answers using the user's profile.
`;

    // Only keep recent conversation history
    const safeHistory = Array.isArray(history)
      ? history.slice(-10)
      : [];

    // Build conversation
    const conversation = [
      {
        role: "developer",
        content: systemPrompt
      },

      ...safeHistory,

      {
        role: "user",
        content: message
      }
    ];

    // Ask OpenAI
    const response = await client.responses.create({
      model: "gpt-5.6",
      input: conversation
    });

    // Send response to frontend
    res.json({
      reply: response.output_text
    });

  } catch (error) {

    console.error("COACH ERROR:", error);

    res.status(500).json({
      error: "AI coach could not respond",
      details: error?.message || "Unknown server error"
    });
  }
});

// =========================
// START SERVER
// =========================

app.listen(port, () => {
  console.log(
    `MY AI PERSONAL TRAINER running on port ${port}`
  );
});
