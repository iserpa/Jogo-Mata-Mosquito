var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 15;
var mosquitoTempo = 1500;

var level = window.location.search;
level = level.replace("?", "");
if(level === "normal"){
  mosquitoTempo = 1500;
} else if(level === "dificil"){
  mosquitoTempo = 1000;
} else if(level === "hardcore"){
  mosquitoTempo = 750;
}

function mudarTamanhoTela(){
  altura = window.innerHeight;
  largura = window.innerWidth;
  console.log(altura, largura);
}
mudarTamanhoTela();

var cronometro = setInterval(function(){
  tempo--;

  if(tempo < 0){
    clearInterval(cronometro);
    clearInterval(mataMosca);
    window.location.href = "vitoria.html";
  }
  else{
    document.getElementById("cronometro").innerHTML = tempo;
  }
}, 1000)

function posicaoRandomica(){

  //remover o mosquito (caso exista)
  if(document.getElementById("mosquito")){
    document.getElementById("mosquito").remove();
    if(vidas > 3){
      window.location.href = "game-over.html";
    }
    else {
      document.getElementById("v" + vidas).src = "img/coracao_vazio.png"
      vidas++;
    }
  }
  var posicaoX = Math.floor(Math.random() * largura) - 90;
  var posicaoY = Math.floor(Math.random() * altura) - 90;

  posicaoX = posicaoX < 0 ? 0 : posicaoX;
  posicaoY = posicaoY < 0 ? 0 : posicaoY;

  //criação imagem mosquito
  var mosquito = document.createElement("img");
  mosquito.src = "img/mosca.png";
  mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio();
  mosquito.style.left = posicaoX + "px";
  mosquito.style.top = posicaoY + "px";
  mosquito.style.position = "absolute";
  mosquito.id = "mosquito";
  mosquito.onclick = function() {
    this.remove();
  }
  document.body.appendChild(mosquito);

}
var mataMosca = setInterval(function() {
  posicaoRandomica();
}, mosquitoTempo);


function tamanhoAleatorio() {
  var classe = Math.floor(Math.random() * 3);

  switch(classe){
    case 0:
      return "mosquito1";
    case 1:
      return "mosquito2";
    case 2: 
      return "mosquito3";
  }
}

function ladoAleatorio() {
  var lado = Math.floor(Math.random() * 2);

  switch(lado){
    case 0:
      return "ladoA";
    case 1:
      return "ladoB";
  }
}