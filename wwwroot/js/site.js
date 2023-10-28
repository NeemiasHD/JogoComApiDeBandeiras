
//start
//EFEITOS SONOROS


function tocadorAudio(som) {
  if (som == 1) {
    document.querySelector(".somAcerto").play();
  }
  if (som == 2) {
    document.querySelector(".somClick").play();
  }
}

function MostrarRanking() {
  document.querySelector(".disponibilizadorDeRanking").innerHTML = "";

  fetch("https://localhost:7106/Players/BuscarTodos")
    .then((response) => response.json())
    .then((data) => {
      data.sort((a, b) => b.pontuacao - a.pontuacao);

      for (let i = 0; i < data.length; i++) {
        document.querySelector(".disponibilizadorDeRanking").innerHTML +=
          i + 1 + "°";
        document
          .querySelector(".disponibilizadorDeRanking")
          .appendChild(document.createElement("br")); //quebrando linha
        document.querySelector(".disponibilizadorDeRanking").innerHTML +=
          data[i].nome;
        document
          .querySelector(".disponibilizadorDeRanking")
          .appendChild(document.createElement("br")); //quebrando linha
        document.querySelector(".disponibilizadorDeRanking").innerHTML +=
          "Pontuação: " + data[i].pontuacao;

        document
          .querySelector(".disponibilizadorDeRanking")
          .appendChild(document.createElement("br")); //quebrando linha
        document
          .querySelector(".disponibilizadorDeRanking")
          .appendChild(document.createElement("br")); //quebrando linha
      }
    });
}

function fecharPopUp() {
  document.querySelector(".PopUp").style.transform = "scale(0)";
  document.querySelector(".PopUp2").style.transform = "scale(0)";
  document.querySelector(".TelaEscura").style.opacity = "0";
}
function abrirPopUp() {
  document.querySelector(".PopUp").style.transform = "scale(1)";
  document.querySelector(".TelaEscura").style.opacity = "1";
  MostrarRanking();
}
function abrirPopUp2() {
  document.querySelector(".PopUp2").style.transform = "scale(1)";
  document.querySelector(".TelaEscura").style.opacity = "1";
  MostrarRanking();
}
