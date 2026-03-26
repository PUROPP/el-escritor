import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/generate", async (req, res) => {
  try {
    const { input, genre, tone } = req.body;

    const prompt = `
Escribe un inicio de libro profesional:
Idea: ${input}
Género: ${genre}
Tono: ${tone}

Incluye título y capítulo 1.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        { role: "system", content: "Eres un escritor profesional." },
        { role: "user", content: prompt }
      ]
    });

    res.json({
      result: response.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({ error: "Error IA" });
  }
});

app.listen(3000, () => console.log("Servidor listo"));
