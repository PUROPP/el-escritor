function generateBook(){
  const input = document.getElementById("inputText").value.trim();
  const genre = document.getElementById("genre").value;
  const tone = document.getElementById("tone").value;

  if(!input){
    alert("Escribe algo primero");
    return;
  }

  const titles = [
    "El destino oculto",
    "Sombras del mañana",
    "El despertar eterno",
    "Crónicas del origen"
  ];

  const title = titles[Math.floor(Math.random()*titles.length)];

  let intro = "";

  switch(genre){
    case "fantasia":
      intro = "En un reino olvidado...";
      break;
    case "terror":
      intro = "Nadie debía haber abierto esa puerta...";
      break;
    case "romance":
      intro = "Todo comenzó con una mirada...";
      break;
    case "ciencia":
      intro = "En un futuro lejano...";
      break;
  }

  let estilo = "";

  switch(tone){
    case "epico":
      estilo = "El destino de todos dependía de ello.";
      break;
    case "oscuro":
      estilo = "La oscuridad lo consumía todo.";
      break;
    case "dramatico":
      estilo = "Nada volvería a ser igual.";
      break;
    case "poetico":
      estilo = "Cada palabra parecía poesía.";
      break;
  }

  const historia = `
📖 ${title}

Capítulo I

${intro} ${input}

${estilo}

Capítulo II

Las consecuencias apenas comenzaban...
`;

  document.getElementById("output").innerText = historia;
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