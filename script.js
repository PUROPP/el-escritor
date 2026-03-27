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
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input, genre, tone })
    });

    const data = await response.json();

    if(data.result){
      output.innerText = data.result;
    } else {
      output.innerText = "⚠️ No se recibió respuesta válida";
    }

  } catch (error) {
    console.error(error);
    output.innerText = "❌ Error conectando con la IA";
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
