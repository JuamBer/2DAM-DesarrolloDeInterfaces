const {
    dialog
} = require('@electron/remote')

let word = document.getElementById("word");
let letter = document.getElementById("letter");
let result = document.getElementById("result");
let btn = document.getElementById("btn");
let img = document.getElementById("img");



let wordvalue;
let arraywordvalue = [];
let hiddenword;
let arrayhiddenword = [];
let wordlenght;
let lettervalue;
let srcimg = 0;
letter.disabled=true;

word.addEventListener('keyup',(e)=>{
    console.log("-----Enter Word-----\n");

    if(e.key=="Enter"){
        wordvalue = word.value;
        arraywordvalue = Array.from(wordvalue);
        wordlenght = wordvalue.length;
        console.log("WordValue: " + wordvalue);
        console.log("WordLenght: " + wordlenght);
        createWord();
        letter.focus();
    }
});
letter.addEventListener('keyup', (e) => {
    console.log("-----Enter Letter-----\n");
    if (e.key == "Enter") {
        lettervalue = letter.value;
        console.log("Letter: " + lettervalue);
        checkLetter(lettervalue);
        letter.value = "";
    }
});

btn.addEventListener('click', () => {
   wordvalue = null;
   arraywordvalue = [];
   hiddenword = null;
   arrayhiddenword = [];
   wordlenght = null;
   lettervalue = null;
   srcimg = 0;
   result.innerHTML=hiddenword;
   letter.value = "";
   word.value="";
   letter.disabled = true;
   word.disabled = false;
   word.focus();

});

function checkLetter(lettervalue) {
    console.log("-----CheckLetter-----\n");
    let isletter = false;
    for (let i = 0; i < wordlenght; i++) {
        if (arraywordvalue[i].toUpperCase() == lettervalue.toUpperCase()) {
            isletter=true;
            arrayhiddenword[i] = arraywordvalue[i];

            let start = hiddenword.substring(0, i);
            let char = wordvalue.substring(i, i + 1);
            let end = hiddenword.substring(i + 1, wordlenght);
            hiddenword = start+char+end;
        }
    }
    result.innerHTML = hiddenword;

    if (hiddenword == wordvalue) {
            dialog.showMessageBox({
                message: 'Victory !',
                type: 'info',
                buttons: ['Okay'],
                title: 'Ahorcado'
            });
    }
    if (isletter == false){
        nextImg();
    }

}
function nextImg(){
    console.log("-----Next Img-----\n");
    srcimg++;

    if (srcimg>6){
           dialog.showMessageBox({
               message: 'Game Over !',
               type: 'info',
               buttons: ['Okay'],
               title: 'Ahorcado'
           });
    }
    let src = "../img/"+ srcimg + ".png";
    img.src = src;


}

function createWord(){
    console.log("-----Create Word-----\n");
    
    letter.disabled=false;
    word.disabled = true;
    hiddenword = "";
    for (let i = 0; i < wordlenght; i++) {
            if (arraywordvalue[i]==" ") {
                hiddenword += " ";
            }else{
                hiddenword += "_";
            }
            
    }
    arrayhiddenword = Array.from(hiddenword);
    result.innerHTML = hiddenword;
    console.log("HiddenWord: " + hiddenword);
}