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

// 🔹 Ruta base (para evitar "Cannot GET /")
app.get("/", (req, res) => {
  res.send("🚀 Servidor de El Escritor funcionando");
});

// 🔹 Ruta principal IA
app.post("/generate", async (req, res) => {
  try {
    const { input, genre, tone } = req.body;

    if (!input) {
      return res.json({
        result: "⚠️ No se recibió texto de entrada"
      });
    }

    const prompt = `
Eres un escritor profesional.

Escribe un inicio de libro con:
- Idea: ${input}
- Género: ${genre}
- Tono: ${tone}

Incluye:
- Título
- Capítulo I
- Narrativa envolvente
`;

    const response = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        { role: "system", content: "Eres un novelista experto." },
        { role: "user", content: prompt }
      ]
    });

    const text = response?.choices?.[0]?.message?.content;

    if (!text) {
      return res.json({
        result: "⚠️ La IA no devolvió contenido"
      });
    }

    res.json({
      result: text
    });

  } catch (error) {
    console.error("ERROR IA:", error);

    res.status(500).json({
      result: "❌ Error generando historia con IA"
    });
  }
});

// 🔹 Puerto dinámico (IMPORTANTE para Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor listo en puerto " + PORT);
});