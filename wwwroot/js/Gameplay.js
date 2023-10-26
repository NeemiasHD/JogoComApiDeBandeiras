let numeroAleatorio2 = 999; //local da resposta certa
    let acertos = 0,
      erros = 0;

let tempo = 20;

Cronometro();
ProximoPais();
if(localStorage.getItem("isMuted")==1){
  document.querySelector(".musica").play();
  
}



 var mutar = document.querySelector(".musica");
function Mutar(){

  if (localStorage.getItem("isMuted")==1) {
    mutar.muted = true;
    localStorage.setItem("isMuted", 0);
    document.getElementById("MutarDesmutar").style.color = "red";
  }else{
    mutar.muted = false;
    localStorage.setItem("isMuted", 1);
    document.querySelector(".musica").play();
    document.getElementById("MutarDesmutar").style.color = "white";
    
  }
}

//função pra iniciar
function ProximoPais(esc) {

  setTimeout(FimDeJogo, 20000);

   if (numeroAleatorio2 != 999) {
     //verificador de resposta
     if (esc == numeroAleatorio2) {
       acertos++;
       document.querySelector(".NumeroAcertos").innerHTML = acertos;
       tocadorAudio(1);
     } else {
       erros++;
       document.querySelector(".NumeroErros").innerHTML = erros;
       tocadorAudio(2);
     }
   }


   if (acertos>0&&acertos%5 == 0) {
     acertos+=2;
     document.querySelector(".GanhoPontoExtra").play();
   }

  fetch("https://restcountries.com/v2/all")
    .then((response) => response.json())
    .then((dados) => {
      const numeroAleatorio = Math.floor(Math.random() * dados.length);
      PaisPrincipal = dados[numeroAleatorio];

      numeroAleatorio2 = Math.floor(Math.random() * 4);
      let escolha = `.escolha${numeroAleatorio2}`;

      let numeroAleatorio3;
      let numeroAleatorio4;
      let numeroAleatorio5;
      for (let i = 0; i < 4; i++) {
        if (i != numeroAleatorio2) {
          if (numeroAleatorio3 != null) {
            if (numeroAleatorio4 != null) {
              numeroAleatorio5 = i;
            } else {
              numeroAleatorio4 = i;
            }
          } else {
            numeroAleatorio3 = i;
          }
        }
      }

      document.querySelector(escolha).innerHTML = PaisPrincipal.translations.pt;
      for (let i = 0; i < 4; i++) {
        if (i != numeroAleatorio2) {
          escolha = `.escolha${i}`;
          document.querySelector(escolha).innerHTML =
            dados[numeroAleatorio + i + 1].translations.pt;
        }
      }

      document.querySelector(".bandeirasorteada").src = PaisPrincipal.flag;
    });
}

function FimDeJogo(){
  document.querySelector(".TelaEscura").style.opacity = "1"; 
  document.querySelector(".PopUpVoltarMenu").style.top = "130px";
  document.querySelector(".PopUpVoltarMenu").style.pointerEvents = "All";
  document.querySelector(".Pontuacaofinal").innerHTML = (acertos-erros);
  document.querySelector(".pontoErro").innerHTML = erros;
  document.querySelector(".pontoAcerto").innerHTML = acertos;

}

function voltar_ao_menu() {
  const nome = localStorage.getItem("valorCampoNome");
  const pontuacao = acertos-erros;
  const curso = {
    nome: nome,
    pontuacao: pontuacao
  };

  fetch("https://localhost:7106/Players/Gravar", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(curso),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });

  document.querySelector(".voltar").click();
}


function Cronometro(){
  document.querySelector(".Contador").innerHTML = tempo;
  if(tempo!=0){
    if(tempo<=10){
      document.querySelector(".clockSound").play();
    }
    tempo--;
    setTimeout(Cronometro,1000);
  }else{
    return;
  }

}
