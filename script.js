function generateBook(){
  const input = document.getElementById("inputText").value;

  if(!input){
    alert("Escribe algo primero");
    return;
  }

  const historias = [
    "Capítulo I: El inicio inesperado\n\n" + input + " cambió el destino de todo sin previo aviso. Nadie imaginaba lo que vendría después...",
    "Capítulo I: El secreto oculto\n\nTodo comenzó cuando " + input + ". Desde ese momento, nada volvió a ser igual.",
    "Capítulo I: El despertar\n\n" + input + " no era solo una idea, era el inicio de una historia que marcaría generaciones."
  ];

  const resultado = historias[Math.floor(Math.random()*historias.length)];

  document.getElementById("output").innerText = resultado;
}
