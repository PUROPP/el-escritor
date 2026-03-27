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

// ✅ Ruta base
app.get("/", (req, res) => {
  res.send("🚀 Servidor de El Escritor funcionando");
});

// ✅ Ruta IA
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
Idea: ${input}
Género: ${genre}
Tono: ${tone}

Incluye:
- Título
- Capítulo I
- Narrativa envolvente
`;

    console.log("📩 Prompt enviado:", prompt);

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: prompt
    });

    console.log("🤖 Respuesta OpenAI:", response);

    const text = response?.output?.[0]?.content?.[0]?.text;

    if (!text) {
      return res.json({
        result: "⚠️ La IA no devolvió contenido"
      });
    }

    res.json({
      result: text
    });

  } catch (error) {
    console.error("🔥 ERROR REAL OPENAI:", error);

    res.status(500).json({
      result: "❌ Error generando historia con IA",
      detalle: error.message
    });
  }
});

// ✅ Puerto dinámico (CRÍTICO)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Servidor corriendo en puerto " + PORT);
});
