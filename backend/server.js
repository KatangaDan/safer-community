// import { AREA_DATA } from "./data";
const { AREA_DATA } = require("./data");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware
app.use(bodyParser.json());

// OpenAI API Key
const OPENAI_API_KEY = process.env.CHATGPT_API_KEY;

// Define a combined prompt for both safety advice and emergency numbers
const BASE_PROMPT = `
You are an AI specializing in providing safety advice and emergency information for travelers in Johannesburg. When a user mentions an area, offer practical safety tips and detailed information about known dangers based on crime data for that location. 
Provide emergency contact numbers and the address of that areas police station.
The data provided includes c (crime), the area, and the rate (amount of times it has happened).

Data: ${AREA_DATA}

Emergency Numbers:
1. Police: 10111
2. Ambulance: 10177
3. Fire Department: 011 375 5911
4. General Emergency: 112 (on mobile)
`;

app.post("/query", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query required" });
  }

  const prompt = `${BASE_PROMPT}\nUser input: ${query}\nResponse:`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: BASE_PROMPT },
          { role: "user", content: query },
        ],
        max_tokens: 500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const prediction = response.data.choices[0].message.content.trim();
    res.json({ response: prediction });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to fetch response from OpenAI" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
