let list = document.getElementById('SongsList');
let btnanterior = document.getElementById('btnanterior');
let btnpausa = document.getElementById('btnpausa');
let btnplay = document.getElementById('btnplay');
let btnsiguiente = document.getElementById('btnsiguiente');
let bar = document.getElementById('progresiveBar');

let key = true;
const fs = require('fs');

let file = fs.readFileSync('db/songs.json');
let songs = new Array();
songs = JSON.parse(file);
let pos = 0;
let cont;
let contTotal;

loadList();

function loadList() {
    let htmlel;
    contTotal = songs[pos].douration;
    for (let i = 0; i < songs.length; i++) {
        if (i == pos) {
            cont = songs[pos].douration;
            
            htmlel = "<ion-item class='activated'> <ion-label>" + songs[pos].name + "</ion-label> <ion-label>" + songs[pos].group + "</ion-label> <ion-label>" + cont + "</ion-label> <ion-label><ion-icon name='musical-note-outline'></ion-icon></ion-label></ion-item>";
            list.innerHTML += htmlel;
           

            minusSong();
        } else {
            htmlel = "<ion-item> <ion-label>" + songs[i].name + "</ion-label> <ion-label>" + songs[i].group + "</ion-label> <ion-label>" + songs[i].douration + "</ion-label> <ion-label></ion-label></ion-item>";
            list.innerHTML += htmlel
        }
    }
}

function reloadList() {
    console.log("s")
    list.innerHTML = "";
    contTotal = songs[pos].douration;
    for (let i = 0; i < songs.length; i++) {
        if (i == pos) {
            
            let htmlel = "<ion-item class='activated'> <ion-label>" + songs[pos].name + "</ion-label> <ion-label>" + songs[pos].group + "</ion-label> <ion-label>" + cont + "</ion-label> <ion-label><ion-icon name='musical-note-outline'></ion-icon></ion-label></ion-item>";
            list.innerHTML += htmlel;

        } else {
            let htmlel = "<ion-item> <ion-label>" + songs[i].name + "</ion-label> <ion-label>" + songs[i].group + "</ion-label> <ion-label>" + songs[i].douration + "</ion-label> <ion-label></ion-label></ion-item>";
            list.innerHTML += htmlel
        }

    }
    bar.value = cont / contTotal;

}

btnanterior.addEventListener('click', () => {
    pos--;
    cont = songs[pos].douration;
    reloadList();
});
btnpausa.addEventListener('click', () => {
    pauseSong();
});
btnplay.addEventListener('click', () => {
    playSong();
});
btnsiguiente.addEventListener('click', () => {
    pos++;
    cont = songs[pos].douration;
    reloadList();
});
function pauseSong(){
    key = false;
}
function playSong() {
    key = true;
    minusSong();
}
function minusSong(){
    if(cont == 0){
       pos++; 
       cont = songs[pos].douration;
       reloadList();
    }else{
        if (key) {
            cont--;

            setTimeout("minusSong()", 1000);
            setTimeout("reloadList()", 1000);
        }
    }
}
