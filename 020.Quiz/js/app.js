let fs = require("fs");
let file = fs.readFileSync('db/test.json');
let test = new Array();
test = JSON.parse(file);

cargarTest(test);

document.getElementById("comprobar").addEventListener('click', () => {
    corregirTest(test);
});

function corregirTest(test){
    let aciertos = 0;
    let fallos = 0;

    for (let i = 0; i < test.length; i++) {

        let check1 = document.getElementById("rA"+i).checked
        let check2 = document.getElementById("rA"+i).checked
        let check3 = document.getElementById("rA"+i).checked

        switch (test[i].correcta) {
            case "a": if (check1){aciertos++;}else{fallos++} continue;
            case "b": if (check2) {aciertos++;}else{fallos++} continue;
            case "c": if (check3) {aciertos++;}else{fallos++} continue;
        }
    }

    document.getElementById("cabecera").innerHTML = "Aciertos: " + aciertos + " Fallos:" + fallos
}

function cargarTest(test) {
    let preguntas = "";
    for (let i = 0; i < test.length; i++) {

        preguntas += `
        <li class="list-group-item"> 
            <img class="img-circle media-object pull-left" src ="../img/${i+1}.png" width="32" height="32">
                <div class="media-body">
                    <strong>${test[i].pregunta}</strong> 
                    <div class = "radio">
                        <label><input type="radio" name="radios${i}" id="rA${i}">${test[i].rA}</label> 
                    </div> 
                    <div class="radio">
                        <label><input type="radio" name="radios${i}" id="rB${i}">${test[i].rB}</label>
                    </div> 
                    <div class="radio">
                        <label><input type="radio" name="radios${i}" id="rC${i}">${test[i].rC}</label> 
                    </div> 
                </div> 
        </li>`
    }
    document.getElementById("lista-preguntas").innerHTML = preguntas;
}