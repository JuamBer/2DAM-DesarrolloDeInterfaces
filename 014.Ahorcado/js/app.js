const {
    dialog
} = require('@electron/remote')

let word = document.getElementById("word");
let tryletter = document.getElementById("tryletter");
let result = document.getElementById("result");
let img = document.getElementById("img");

let wordvalue;
let hidenword;
let wordlenght;
let srcimg = 0;
//tryletter.disabled="true";

word.addEventListener('keyup',(e)=>{
    if(e.key=="Enter"){
        wordvalue = word.value;
        wordlenght = wordvalue.length;
        console.log("resultvalue: " + wordvalue);
        console.log("wordlenght: " + wordlenght);
        createWord();
    }
});
tryletter.addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        checkLetter();
    }
});
function checkLetter(){
    console.log("-----CheckLetter-----");
    let isLetter = false;
    let letter = tryletter.value;
    console.log("Letter: "+letter)
    for (let i = 0; i < wordlenght; i++) {
        console.log("resultvalue[i]:"+resultvalue[i]);
        if (resultvalue[i] == letter) {
            isLetter=true;
            console.log("mediumresult[i]: "+mediumresult[i]);
            let carac = resultvalue.substring(i, i + 1);
            mediumresult.replace();
            console.log("mediumresult[i]: " + mediumresult[i]);
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
    console.log("-----creareWord-----")
    
    //tryletter.disabled="false";
    hiddenword = "";
    for (let i = 0; i < wordlenght; i++) {
            console.log("_");
            hiddenword += "_";
    }

    result.innerHTML = hiddenword;
    console.log("ResultValue: " + wordvalue);
    console.log("MediumResult: " + hiddenword);
}