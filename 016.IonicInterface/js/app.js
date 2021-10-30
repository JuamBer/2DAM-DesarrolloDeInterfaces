let list = document.getElementById('SongsList');
let btnanterior = document.getElementById('btnanterior');
let btnpausaplay = document.getElementById('btnpausaplay');
let iconpausaplay = document.getElementById('iconpausaplay');
let btnsiguiente = document.getElementById('btnsiguiente');
let bar = document.getElementById('progresiveBar');

let pausaplay = true;
let key = false;
const fs = require('fs');
let file = fs.readFileSync('db/songs.json');
let songs = new Array();
songs = JSON.parse(file);
let pos = 0;
let cont;
let contTotal;
let song = new Audio("../"+songs[pos].file);

loadList();

function loadList() {
    let htmlel;
    contTotal = songs[pos].douration;
    for (let i = 0; i < songs.length; i++) {
        if (i == pos) {
            cont = songs[pos].douration;
            
            htmlel = "<ion-item class='activated'> <ion-label>" + songs[pos].name + "</ion-label> <ion-label>" + songs[pos].group + "</ion-label> <ion-label>" + cont + "</ion-label> <ion-label><ion-icon name='musical-note-outline'></ion-icon></ion-label></ion-item>";
            list.innerHTML += htmlel;
           
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
    song.pause();
    pos--;
    cont = songs[pos].douration;
    song = new Audio("../" + songs[pos].file);
    song.play();
    reloadList();
});
btnpausaplay.addEventListener('click', () => {

    if (pausaplay){
        playSong();
        iconpausaplay.name = "pause-outline";
        pausaplay = !pausaplay;
    }else{
        pauseSong();
        iconpausaplay.name = "play-outline";
        pausaplay = !pausaplay;
    }
    
});

btnsiguiente.addEventListener('click', () => {
    song.pause();
    pos++;
    cont = songs[pos].douration;
    song = new Audio("../" + songs[pos].file);
    song.play();
    reloadList();
});
function pauseSong(){
    song.pause();
    key = false;
}
function playSong() {
    key = true;
    
    song.play();
    minusSong();
}
function minusSong(){
    if(cont == 0){
       song.pause();
       pos++; 
       cont = songs[pos].douration;
       song = new Audio("../" + songs[pos].file);
       song.play();
       reloadList();
       minusSong();
    }else{
        if (key) {
            cont--;

            setTimeout("minusSong()", 1000);
            setTimeout("reloadList()", 1000);
        }
    }
}
