const {
    dialog
} = require('@electron/remote')

let word = document.getElementById("word");
let tryletter = document.getElementById("tryletter");
let result = document.getElementById("result");
let img = document.getElementById("img");

let resultvalue;
let mediumresult;
let wordlenght;
let srcimg = 0;
//tryletter.disabled="true";

word.addEventListener('keyup',(e)=>{
    if(e.key=="Enter"){
        resultvalue = word.value;
        wordlenght = resultvalue.length;
        createWord();
    }
});
tryletter.addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        checkLetter();
    }
});
function checkLetter(){
    console.log("CheckLetter");
    let isLetter = false;
    let letter = tryletter.value;
    for (let i = 0; i < resultvalue.length; i++) {
        if (resultvalue[i] == letter) {
            isLetter=true;
            mediumresult[i] = resultvalue[i];
            result.innerHTML = mediumresult;
        }
    }
    console.log("ResultValue: "+resultvalue);
    console.log("MediumResult: " + mediumresult);

    if (mediumresult == resultvalue){
        dialog.showErrorBox("Victory", "Victory")
    }

    if (isLetter == false){
        nextImg();
    }

}
function nextImg(){
    srcimg++;

    if (srcimg>6){
        dialog.showErrorBox("Game Over", "Game Over")
    }
    let src = "../img/"+ srcimg + ".png";
    img.src = src;


}


function createWord(){
    console.log("creareWord")
    
    //tryletter.disabled="false";
    mediumresult = "";
    for (let i = 0; i < wordlenght; i++) {
            console.log("_");
            mediumresult  += "_";
    }

    result.innerHTML = mediumresult;
    console.log("ResultValue: " + resultvalue);
    console.log("MediumResult: " + mediumresult);
}