import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("MY AI PERSONAL TRAINER is online 💪");
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "MY AI PERSONAL TRAINER"
  });
});

app.post("/api/coach", async (req, res) => {
  try {
    const { profile = {}, message, history = [] } = req.body;

    if (!message) {
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
chest pain or another concerning symptom, advise them
to stop training and seek appropriate medical care.

Keep answers clear, practical and useful.
`;

    const conversation = [
      {
        role: "developer",
        content: systemPrompt
      },
      ...history.slice(-10),
      {
        role: "user",
        content: message
      }
    ];

    const response = await client.responses.create({
      model: "gpt-5.6",
      input: conversation
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error("COACH ERROR:", error);

    res.status(500).json({
      error: "AI coach could not respond",
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`MY AI PERSONAL TRAINER running on port ${port}`);
});    const systemPrompt = `
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
chest pain or another concerning symptom, advise them
to stop training and seek appropriate medical care.

Keep answers clear, practical and useful.
`;

    const conversation = [
      {
        role: "developer",
        content: systemPrompt
      },
      ...history.slice(-10),
      {
        role: "user",
        content: message
      }
    ];

    const response = await client.responses.create({
      model: "gpt-5.6",
      input: conversation
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error("COACH ERROR:", error);

    res.status(500).json({
      error: "AI coach could not respond",
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`MY AI PERSONAL TRAINER running on port ${port}`);
});
body {
  font-family: Arial, sans-serif;
  background: #0b0f14;
  color: white;
}

header {
  background: linear-gradient(135deg,#111827,#172033);
  padding: 25px 18px;
  text-align: center;
  border-bottom: 1px solid #263244;
}

header h1 {
  font-size: 28px;
  margin-bottom: 8px;
}

header p {
  color: #aab4c3;
}

.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

.card {
  background: #121923;
  border: 1px solid #263244;
  border-radius: 18px;
  padding: 20px;
  margin-bottom: 18px;
}

.card h2 {
  margin-bottom: 15px;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 12px;
}

input, select {
  width: 100%;
  padding: 14px;
  background: #0b1119;
  border: 1px solid #334155;
  border-radius: 10px;
  color: white;
  margin-top: 6px;
}

label {
  color: #aab4c3;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 10px;
  background: #22c55e;
  color: #06120a;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  margin-top: 14px;
}

button:hover {
  opacity: .9;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 10px;
}

.stat {
  background: #0b1119;
  padding: 18px 10px;
  border-radius: 12px;
  text-align: center;
}

.stat strong {
  display: block;
  font-size: 24px;
  margin-bottom: 5px;
}

.stat span {
  color: #94a3b8;
  font-size: 13px;
}

.chat {
  min-height: 250px;
  max-height: 400px;
  overflow-y: auto;
  background: #0b1119;
  border-radius: 12px;
  padding: 15px;
}

.message {
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 10px;
  line-height: 1.5;
}

.user {
  background: #1d4ed8;
  text-align: right;
}

.ai {
  background: #1f2937;
}

.chat-input {
  display: flex;
  gap: 8px;
}

.chat-input input {
  flex: 1;
}

.chat-input button {
  width: 100px;
}

.workout {
  background: #0b1119;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 10px;
}

.workout h3 {
  margin-bottom: 8px;
}

.workout p {
  color: #aab4c3;
  line-height: 1.6;
}

.warning {
  color: #fbbf24;
  font-size: 13px;
  margin-top: 10px;
}

@media(max-width:600px) {

  .profile-grid {
    grid-template-columns: 1fr;
  }

  .stats {
    grid-template-columns: 1fr 1fr 1fr;
  }

  header h1 {
    font-size: 23px;
  }

}

</style>
</head>

<body>

<header>
  <h1>💪 MY AI PERSONAL TRAINER</h1>
  <p>Your personal fitness coach</p>
</header>

<div class="container">

<div class="card">

<h2>👤 Your Profile</h2>

<div class="profile-grid">

<div>
<label>Weight (kg)</label>
<input id="weight" type="number" value="55">
</div>

<div>
<label>Goal</label>
<select id="goal">
<option value="build muscle and gain healthy weight">
Build muscle & gain healthy weight
</option>
<option value="build muscle">
Build muscle
</option>
<option value="lose fat">
Lose fat
</option>
<option value="general fitness">
General fitness
</option>
</select>
</div>

<div>
<label>Experience</label>
<select id="experience">
<option value="beginner">Beginner</option>
<option value="intermediate">Intermediate</option>
<option value="advanced">Advanced</option>
</select>
</div>

<div>
<label>Training days per week</label>
<select id="trainingDays">
<option value="3">3 days</option>
<option value="4">4 days</option>
<option value="5">5 days</option>
<option value="6">6 days</option>
</select>
</div>

</div>

<button onclick="generateWorkout()">
Generate My Workout Plan
</button>

</div>


<div class="card">

<h2>📊 My Starting Stats</h2>

<div class="stats">

<div class="stat">
<strong id="weightStat">55kg</strong>
<span>Weight</span>
</div>

<div class="stat">
<strong>💪</strong>
<span>Goal</span>
</div>

<div class="stat">
<strong>🔥</strong>
<span>Consistency</span>
</div>

</div>

</div>


<div class="card">

<h2>🏋️ Today's Workout</h2>

<div id="workout">

<div class="workout">

<h3>Full Body Beginner Workout</h3>

<p>
Squats — 3 × 10<br>
Push-ups — 3 × 8<br>
Lunges — 3 × 10 each leg<br>
Backpack Rows — 3 × 10<br>
Shoulder Press — 3 × 10<br>
Plank — 3 × 30 seconds
</p>

</div>

</div>

</div>


<div class="card">

<h2>🤖 Ask Your AI Coach</h2>

<div class="chat" id="chat">

<div class="message ai">
👋 Hello! I'm your AI personal trainer.
<br><br>
I know you're starting at <strong>55 kg</strong>.
Ask me about your workout, food, recovery, exercises or progress.
</div>

</div>

<div class="chat-input">

<input
id="message"
placeholder="Ask your trainer..."
onkeydown="if(event.key==='Enter') sendMessage()"
>

<button onclick="sendMessage()">Send</button>

</div>

<p class="warning">
⚠️ Stop exercise if you experience serious pain, chest pain,
fainting or another concerning symptom and seek appropriate medical care.
</p>

</div>

</div>


<script>

let history = [];

function getProfile() {

  return {
    weight: document.getElementById("weight").value,
    goal: document.getElementById("goal").value,
    experience: document.getElementById("experience").value,
    trainingDays: document.getElementById("trainingDays").value
  };

}


function addMessage(text,type) {

  const chat = document.getElementById("chat");

  const div = document.createElement("div");

  div.className = "message " + type;

  div.innerHTML = text.replace(/\\n/g,"<br>");

  chat.appendChild(div);

  chat.scrollTop = chat.scrollHeight;

}


async function sendMessage() {

  const input = document.getElementById("message");

  const message = input.value.trim();

  if (!message) return;

  addMessage(message,"user");

  input.value = "";

  addMessage("🤔 Thinking...","ai");

  try {

    const response = await fetch("/api/coach", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        profile: getProfile(),

        message: message,

        history: history

      })

    });

    const data = await response.json();

    const chat = document.getElementById("chat");

    chat.lastElementChild.remove();

    if (data.reply) {

      addMessage(data.reply,"ai");

      history.push({
        role: "user",
        content: message
      });

      history.push({
        role: "assistant",
        content: data.reply
      });

    } else {

      addMessage("Sorry, I couldn't respond right now.","ai");

    }

  } catch(error) {

    const chat = document.getElementById("chat");

    chat.lastElementChild.remove();

    addMessage("Connection error. Please try again.","ai");

  }

}


async function generateWorkout() {

  const profile = getProfile();

  document.getElementById("weightStat").textContent =
    profile.weight + "kg";

  const workout = document.getElementById("workout");

  workout.innerHTML =
    '<div class="workout">' +
    '<h3>🔥 Personalized Workout</h3>' +
    '<p>' +
    'Based on your ' + profile.experience +
    ' level and ' +
    profile.trainingDays +
    ' training days per week, ' +
    'your AI coach will create your personalized plan.' +
    '</p>' +
    '</div>';

  const message =
    "Create my workout plan for today. I weigh " +
    profile.weight +
    " kg and my goal is " +
    profile.goal +
    ". I am a " +
    profile.experience +
    " and train " +
    profile.trainingDays +
    " days per week.";

  document.getElementById("message").value = message;

  await sendMessage();

}


</script>

</body>
</html>
  `);
});


/* =========================
   HEALTH CHECK
========================= */

app.get("/api/health", (req, res) => {

  res.json({
    ok: true,
    service: "MY AI PERSONAL TRAINER"
  });

});


/* =========================
   AI COACH
========================= */

app.post("/api/coach", async (req, res) => {

  try {

    const {
      profile = {},
      message,
      history = []
    } = req.body;

    if (!message) {

      return res.status(400).json({
        error: "Message is required"
      });

    }

    const systemPrompt = `

You are MY AI PERSONAL TRAINER.

You are a supportive, practical fitness coach.

USER PROFILE:

Weight:
${profile.weight || "unknown"} kg

Goal:
${profile.goal || "build muscle and gain healthy weight"}

Experience:
${profile.experience || "beginner"}

Training days:
${profile.trainingDays || "3"} days per week

The user wants personalized coaching.

Priorities:

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

For a beginner, keep workouts realistic.

Do not recommend dangerous weight gain,
extreme dieting, steroids, unsafe supplements,
or excessive training.

Give practical food suggestions using foods
that are reasonably accessible in Nigeria when
nutrition is discussed.

Examples may include:

eggs
rice
beans
yam
potatoes
oats
milk
groundnuts
peanut butter
chicken
beef
fish
vegetables
fruit

Do not claim that being an "ectomorph" means
the user has a special metabolism that prevents
weight gain. Explain that body-frame labels are
not a medical diagnosis and that calorie intake,
training, recovery and genetics all influence results.

If the user reports serious pain, chest pain,
fainting, severe dizziness, serious injury or
another concerning symptom, tell them to stop
training and seek appropriate medical care.

Keep answers clear and encouraging.

When creating workouts, include:

Exercise
Sets
Repetitions
Rest time
Technique tips

When creating nutrition guidance, focus on
balanced meals and gradual progress.

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
        content: message
      }

    ];

    const response = await client.responses.create({

      model: "gpt-5.6",

      input: conversation

    });

    res.json({

      reply: response.output_text

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      error: "AI coach could not respond"

    });

  }

});


/* =========================
   START SERVER
========================= */

app.listen(port, () => {

  console.log(
    `MY AI PERSONAL TRAINER running on port ${port}`
  );

});    const systemPrompt = `
You are MY AI PERSONAL TRAINER, a supportive personal fitness coach.

User profile:
- Weight: ${profile?.weight || "unknown"} kg
- Goal: ${profile?.goal || "build muscle"}
- Experience: ${profile?.experience || "beginner"}
- Training days: ${profile?.trainingDays || "not specified"}

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

Keep answers clear and useful.
`;

    const conversation = [
      {
        role: "developer",
        content: systemPrompt
      },
      ...history.slice(-10),
      {
        role: "user",
        content: message
      }
    ];

    const response = await client.responses.create({
      model: "gpt-5.6",
      input: conversation
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "AI coach could not respond",
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`MY AI PERSONAL TRAINER running on port ${port}`);
});
