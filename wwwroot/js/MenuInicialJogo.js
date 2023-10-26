var inputElement = document.querySelector(".nomeusuario");

var valorSalvo = localStorage.getItem("valorCampoNome");

localStorage.setItem("isMuted", false);


// Adicione um ouvinte de evento para salvar o valor no localStorage sempre que o campo de entrada for alterado.
inputElement.addEventListener("input", function () {
  if (document.querySelector(".nomeusuario").value != "") {
    document.querySelector(".botaoIniciar").style.backgroundColor = "#00ca00fd";
  } else {
    document.querySelector(".botaoIniciar").style.backgroundColor = "#00ca004d";
  }
  localStorage.setItem("valorCampoNome", inputElement.value);
});


function Inicializador() {
  if (document.querySelector(".nomeusuario").value === "") {
    document.querySelector(".AvisoErro").innerHTML =
      "Preencha com o nome do usuário";
  } else {
    verificadordeNome(document.querySelector(".nomeusuario").value);
  }
}

function verificadordeNome(nome) {
  fetch("https://localhost:7106/Players/BuscarTodos")
    .then((response) => response.json())
    .then((data) => {
      let nomeInvalido = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].nome === nome) {
          nomeInvalido = 1;
        }
      }
      if (nomeInvalido) {
        document.querySelector(".AvisoErro").innerHTML =
          "Nome do usuario já existe, tente outro";
      } else {
        document.querySelector(".iniciar").click();
      }
    });
}

