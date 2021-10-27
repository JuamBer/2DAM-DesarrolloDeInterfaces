const {
    dialog
} = require('@electron/remote');


const LON = 4;
var images;
var result;
var xwhite;
var ywhite;

fillImages(LON);
fillResult(LON);
createPuzzle(LON);
searchWhite(LON);
createListeners(xwhite, ywhite, LON);

console.log(images);
console.log(result);

function fillImages(lon){
    images = new Array(LON);

    for (let i = 0; i < LON; i++) {
        images[i] = new Array(LON);
    }
}
function fillResult(lon) {
    result = new Array(LON);

    for (let i = 0; i < LON; i++) {
        result[i] = new Array(LON);
    }

    for (let x = 0; x < lon; x++) {
        for (let y = 0; y < lon; y++) {
            result[x][y] = "../img/" + x.toString() + y.toString() + ".jpg";
        }
    }
    result[0][0] = "../img/white.jpg";
}

function createPuzzle(lon) {
    console.log("\n-------createPuzzle-------");
    for (let x = 0; x < lon; x++) {
        for (let y = 0; y < lon; y++) {
            images[x][y] = "../img/" + x.toString() + y.toString() + ".jpg";
        }
    }

    images[0][0] = "../img/white.jpg";

    for (let x = 0; x < lon; x++) {
        for (let y = 0; y < lon; y++) {
            let aux = images[x][y];
            let ran1 = Math.round(Math.random() * 3);
            let ran2 = Math.round(Math.random() * 3);
    
            images[x][y] = images[ran1][ran2];
            images[ran1][ran2] = aux;
        }
    }
    seeImages(lon);
}

function seeImages(lon) {
    console.log("\n-------seeImages-------");
    for (let x = 0; x < lon; x++) {
        for (let y = 0; y < lon; y++) {
            let image = images[x][y];
            let src = "img" + x + "" + y;
            document.getElementById(src).src = image;
        }
    }
}

function searchWhite(lon) {
    console.log("\n-------searchWhite-------");
    for (let x = 0; x < lon; x++) {
        for (let y = 0; y < lon; y++) {
            if (images[x][y] == "../img/white.jpg") {
                xwhite = x;
                ywhite = y;
                console.log("X: " + xwhite + " Y: " + xwhite);
            }
        }
    }
}

function createListeners(x, y, lon) {
    console.log("\n-------createListeners-------");

    if (!((x - 1) < 0)) {
        let variablexup = x - 1;
        let variableyup = y;

        let src = "img" + variablexup + "" + variableyup;
        console.log("Creating Listener Up Imagen: " + src);
        document.getElementById(src).style.background = '#07DE5D';
        document.getElementById(src).addEventListener('click', changeImgUp);
    }

    if (!((x + 1) >= lon)) {
        let variablexdown = x + 1;
        let variableydown = y;

        let src = "img" + variablexdown + "" + variableydown;
        console.log("Creating Listener Down Imagen: " + src);
        document.getElementById(src).style.background = '#07DE5D';
        document.getElementById(src).addEventListener('click', changeImgDown);
    }
    if (!((y - 1) < 0)) {
        let variablexleft = x;
        let variableyleft = y - 1;

        let src = "img" + variablexleft + "" + variableyleft;
        console.log("Creating Listener Left Imagen: " + src);
        document.getElementById(src).style.background = '#07DE5D';
        document.getElementById(src).addEventListener('click', changeImgLeft);
    }
    if (!((y + 1) >= lon)) {
        let variablexrigth = x;
        let variableyrigth = y + 1;

        let src = "img" + variablexrigth + "" + variableyrigth;
        console.log("Creating Listener Rigth Imagen: " + src);
        document.getElementById(src).style.background = '#07DE5D';
        document.getElementById(src).addEventListener('click', changeImgRight);
    }

}
function checkWin(lon){
    console.log("-----CheckWin-----");
    let key = true;
    for (let x = 0; x < lon; x++) {
        for (let y = 0; y < lon; y++) {
            if (!(images[x][y] == result[x][y])) {
                key = false;
                break;
            }
        }
    }
    console.log(key);
    if(key){
        images[0][0] = "../img/00.jpg";
        document.getElementById("img00").src = images[0][0];
        dialog.showMessageBox({
            message: 'Win !',
            type: 'info',
            buttons: ['Okay'],
            title: 'Puzzle'
        });
    }
}
function changeImg(variablex, variabley, lon) {
    let aux = images[variablex][variabley];
    images[variablex][variabley] = images[xwhite][ywhite];
    images[xwhite][ywhite] = aux;

    removeListeners(xwhite, ywhite, variablex, variabley, lon);
    seeImages(lon);

    xwhite = variablex;
    ywhite = variabley;

    checkWin(lon);
    console.log("X: " + xwhite + " Y: " + ywhite);

}

function changeImgUp() {
    console.log("\n-------changeImg Up-------");
    let variablex = xwhite - 1;
    let variabley = ywhite;

    changeImg(variablex, variabley, LON);
}

function changeImgDown() {
    console.log("\n-------changeImg Down-------");
    let variablex = xwhite + 1;
    let variabley = ywhite;

    changeImg(variablex, variabley, LON);
}

function changeImgLeft() {
    console.log("\n-------changeImg Left-------");
    let variablex = xwhite;
    let variabley = ywhite - 1;

    changeImg(variablex, variabley, LON);
}

function changeImgRight() {
    console.log("\n-------changeImg Right-------");
    let variablex = xwhite;
    let variabley = ywhite + 1;

    changeImg(variablex, variabley, LON);
}

function removeListeners(x, y, createx, createy, lon) {
    console.log("\n-------removeListeners-------");
    let variablex;
    let variabley;
    let src = null;

    if (!((x - 1) < 0)) {
        variablex = x - 1;
        variabley = y;
        src = "img" + variablex + "" + variabley;


        console.log('Removing Up Listener: ' + src);
        document.getElementById(src).style.background = '#2F2F2F';
        document.getElementById(src).removeEventListener('click', changeImgUp);
    }

    if (!((x + 1) >= lon)) {
        variablex = x + 1;
        variabley = y;
        src = "img" + variablex + "" + variabley;


        console.log('Removing Down Listener: ' + src);
        document.getElementById(src).style.background = '#2F2F2F';
        document.getElementById(src).removeEventListener('click', changeImgDown);
    }

    if (!((y - 1) < 0)) {
        variablex = x;
        variabley = y - 1;
        src = "img" + variablex + "" + variabley;

        console.log('Removing Left Listener: ' + src);
        document.getElementById(src).style.background = '#2F2F2F';
        document.getElementById(src).removeEventListener('click', changeImgLeft);

    }

    if (!((y + 1) >= lon)) {
        variablex = x;
        variabley = y + 1;
        src = "img" + variablex + "" + variabley;

        console.log('Removing Rigth Listener: ' + src);
        document.getElementById(src).style.background = '#2F2F2F';
        document.getElementById(src).removeEventListener('click', changeImgRight);
    }
    createListeners(createx, createy, lon);
}

function a() {

}