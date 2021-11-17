let inputApuesta = document.getElementById("inputApuesta");
let inputPalo = document.getElementById("inputPalo");

let btnApostar = document.getElementById("btnApostar");
let btnReset = document.getElementById("btnReset");
let notif = document.getElementById('notification');

let result = new Array(6);
let numMatches = 0;
let palo;
let apuesta;
let credito = 1000;
let numCardsFlipped = 0;

reloadCredit(true,0);

btnApostar.addEventListener('click', ()=>{
    topBet();
    btnApostar.disabled = true;
});
btnReset.addEventListener('click', () => {
    reset();
});

document.getElementById("img1").addEventListener('click', () => {flipCard(1);});
document.getElementById("img2").addEventListener('click', () => {flipCard(2);});
document.getElementById("img3").addEventListener('click', () => {flipCard(3);});
document.getElementById("img4").addEventListener('click', () => {flipCard(4);});
document.getElementById("img5").addEventListener('click', () => {flipCard(5);});
document.getElementById("img6").addEventListener('click', () => {flipCard(6);});

function reset(){
    btnApostar.disabled = false;
    numCardsFlipped = 0;
    numMatches = 0;
    inputApuesta.value=0;
    inputPalo.value = "Oros";
    for (let i = 1; i <= result.length; i++) {
        result[i - 1] = "../img/dorso.png";
        console.log("RESULT " + i +": " + "../img/dorso.png");
        document.getElementById("img" + i).src = "../img/dorso.png";
    }
}

function topBet(){
    palo = inputPalo.value;
    apuesta = inputApuesta.value;

    console.log("Palo: "+palo);
    console.log("Apuesta: " + apuesta);

    for (let i = 1; i <= result.length; i++) {
        result[i-1] = Math.round(Math.random() * (4 - 1) + 1);
        console.log("RESULT " + i + ": " + result[i - 1]);
    }
}

function flipCard(card) {
    numCardsFlipped++;
    switch (result[card - 1]) {
        case 1:
            srcImg = "../img/oros.png";
            if(palo=="Oros"){ numMatches++; }
            break;
        case 2:
            srcImg = "../img/copas.png";
            if(palo=="Copas"){ numMatches++; }
            break;
        case 3:
            srcImg = "../img/espadas.png";
            if(palo=="Espadas"){ numMatches++; }
            break;
        case 4:
            srcImg = "../img/bastos.png";
            if(palo=="Bastos"){ numMatches++; }
            break;
    }
    
    document.getElementById("img"+card).src=srcImg;

    console.log("numCardsFlipped: "+numCardsFlipped);
    if (numCardsFlipped >= 6) {
        console.log("numCardsFlipped superiror a 6: " + numCardsFlipped);
        checkWin();
    }
}

function checkWin() {
    if (numMatches >= 2){
        let text = "Has optenido " + numMatches + " Aciertos \n Enorabuena Has Ganado";
        notif.innerText = text;
        reloadCredit(true, apuesta);
    }else{
        let text = "Has optenido " + numMatches + " Aciertos \n Has Perdido";
        notif.innerText = text;
        reloadCredit(false, apuesta);
    }
    numMatches=0;
    numCardsFlipped = 0;
    notif.opened = true;
}

function reloadCredit(check, apuesta) {
    let htmlcredito = document.getElementById('credito');
    console.log(credito);
    if (check) {
        credito = credito + (apuesta * 2);
        htmlcredito.innerHTML = "Credito: " + credito;
    } else {
        credito = credito - (apuesta);
        htmlcredito.innerHTML = "Credito: " + credito;
    }
}