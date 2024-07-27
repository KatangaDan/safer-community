import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware
app.use(bodyParser.json());

app.post("/query", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query required" });
  }

  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/query",
      { question: query },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const prediction = response.data.response.trim();
    res.json({ response: prediction });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch response from Python server" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
