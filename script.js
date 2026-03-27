const API_URL = "https://el-escritor.onrender.com/generate";

async function generateBook(){
  const input = document.getElementById("inputText").value.trim();
  const genre = document.getElementById("genre").value;
  const tone = document.getElementById("tone").value;

  if(!input){
    alert("Escribe algo primero");
    return;
  }

  const output = document.getElementById("output");
  output.innerText = "⏳ Generando historia con IA...";

  try {
    console.log("🚀 Enviando request a:", API_URL);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input, genre, tone })
    });

    console.log("📡 Status:", response.status);

    // 👇 SI EL BACKEND RESPONDE MAL, LO VEMOS
    if (!response.ok) {
      const text = await response.text();
      console.error("❌ Error backend:", text);
      throw new Error("Backend: " + text);
    }

    const data = await response.json();

    console.log("✅ Respuesta:", data);

    if(data.result){
      output.innerText = data.result;
    } else {
      output.innerText = "⚠️ Respuesta vacía del servidor";
    }

  } catch (error) {
    console.error("🔥 ERROR TOTAL:", error);

    output.innerText =
      "❌ Error real:\n\n" +
      error.message +
      "\n\n(Abre consola para más detalles)";
  }
}

function copyText(){
  const text = document.getElementById("output").innerText;

  navigator.clipboard.writeText(text)
    .then(() => alert("Texto copiado"))
    .catch(() => alert("Error al copiar"));
}

function downloadText(){
  const text = document.getElementById("output").innerText;

  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "mi_libro.txt";
  link.click();
}
