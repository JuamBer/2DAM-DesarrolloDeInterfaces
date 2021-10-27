const {
    dialog

} = require('@electron/remote');

let img00 = document.getElementById("img00");
let img01 = document.getElementById("img01");
let img02 = document.getElementById("img02");
let img03 = document.getElementById("img03");
let img10 = document.getElementById("img10");
let img11 = document.getElementById("img11");
let img12 = document.getElementById("img12");
let img13 = document.getElementById("img13");
let img20 = document.getElementById("img20");
let img21 = document.getElementById("img21");
let img22 = document.getElementById("img22");
let img23 = document.getElementById("img23");
let img30 = document.getElementById("img30");
let img31 = document.getElementById("img31");
let img32 = document.getElementById("img32");
let img33 = document.getElementById("img33");

const LON = 4;
var images = new Array(LON);

for (let i = 0; i < LON; i++) {
    images[i] = new Array(LON);
}

var xwhite;
var ywhite;

createPuzzle(LON);
searchWhite(LON);
createListeners(LON);
removeListeners(LON);

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
    seeImgages(lon);

}

function seeImgages(lon) {
    console.log("\n-------seeImages-------");
    for (let x = 0; x < lon; x++) {
        for (let y = 0; y < lon; y++) {
            let image = images[x][y].toString();
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

function changeImgUp() {
    console.log("\n-------changeImg Up-------");
    let variablex = xwhite - 1;
    let variabley = ywhite;
    document.getElementById("img" + variablex.toString() + "" + variabley.toString()).style.background = '#2f2f2f';
    let aux = images[variablex][variabley];
    images[variablex][variabley] = images[xwhite][ywhite];
    images[xwhite][ywhite] = aux;

    xwhite = variablex;
    ywhite = variabley;
    console.log("X: " + xwhite + " Y: " + ywhite);
    removeListeners(LON);
    seeImgages(LON);
}

function createListeners(lon) {
    console.log("\n-------createListeners-------");

    if (!((xwhite - 1) < 0)) {
        let variablexup = xwhite - 1;
        let variableyup = ywhite;

        let src = "img" + variablexup + "" + variableyup;
        console.log("Creating Listener Up Imagen: " + src);
        document.getElementById(src).style.background = '#07DE5D';
        document.getElementById(src).addEventListener('click', changeImgUp, {
            once: true
        });
    }

    if (!((xwhite + 1) >= lon - 1)) {
        let variablexdown = xwhite + 1;
        let variableydown = ywhite;

        let src = "img" + variablexdown + "" + variableydown;
        console.log("Creating Listener Down Imagen: " + src);
        document.getElementById(src).style.background = '#07DE5D';
        document.getElementById(src).addEventListener('click', changeImgDown, {
            once: true
        });
    }
    if (!((ywhite - 1) < 0)) {
        let variablexleft = xwhite;
        let variableyleft = ywhite - 1;

        let src = "img" + variablexleft + "" + variableyleft;
        console.log("Creating Listener Left Imagen: " + src);
        document.getElementById(src).style.background = '#07DE5D';
        document.getElementById(src).addEventListener('click', changeImgLeft, {
            once: true
        });
    }
    if (!((ywhite + 1) >= lon - 1)) {
        let variablexrigth = xwhite;
        let variableyrigth = ywhite + 1;

        let src = "img" + variablexrigth + "" + variableyrigth;
        console.log("Creating Listener Rigth Imagen: " + src);
        document.getElementById(src).style.background = '#07DE5D';
        document.getElementById(src).addEventListener('click', changeImgRight, {
            once: true
        });
    }

}



function changeImgDown() {
    console.log("\n-------changeImg Down-------");
    let variablex = xwhite + 1;
    let variabley = ywhite;
    document.getElementById("img" + variablex.toString() + "" + variabley.toString()).style.background = '#2f2f2f';
    let aux = images[variablex][variabley];
    images[variablex][variabley] = images[xwhite][ywhite];
    images[xwhite][ywhite] = aux;

    xwhite = variablex;
    ywhite = variabley;
    console.log("X: " + xwhite + " Y: " + ywhite);
    removeListeners(LON);
    seeImgages(LON);
}

function changeImgLeft() {
    console.log("\n-------changeImg Left-------");
    let variablex = xwhite;
    let variabley = ywhite - 1;
    document.getElementById("img" + variablex.toString() + "" + variabley.toString()).style.background = '#2f2f2f';
    let aux = images[variablex][variabley];
    images[variablex][variabley] = images[xwhite][ywhite];
    images[xwhite][ywhite] = aux;

    xwhite = variablex;
    ywhite = variabley;
    console.log("X: " + xwhite + " Y: " + ywhite);
    removeListeners(LON);
    seeImgages(LON);

}

function changeImgRight() {
    console.log("\n-------changeImg Right-------");
    let variablex = xwhite;
    let variabley = ywhite + 1;
    document.getElementById("img" + variablex.toString() + "" + variabley.toString()).style.background = '#2f2f2f';
    let aux = images[variablex][variabley];
    images[variablex][variabley] = images[xwhite][ywhite];
    images[xwhite][ywhite] = aux;

    xwhite = variablex;
    ywhite = variabley;
    console.log("X: " + xwhite + " Y: " + ywhite);
    removeListeners(LON);
    seeImgages(LON);

}

function removeListeners(lon) {
    console.log("\n-------removeListeners-------");
    let variablex = null;
    let variabley = null;
    let src = null;

    if (!((xwhite - 1) < 0)) {
        variablex = xwhite - 1;
        variabley = ywhite;
        src = "img" + variablex + "" + variabley;

        document.getElementById(src).style.background = '#FFFFFF';
        console.log('Removing Up Listener: ' + src);
    }

    if (!((xwhite + 1) >= lon - 1)) {
        variablex = xwhite + 1;
        variabley = ywhite;
        src = "img" + variablex + "" + variabley;

        document.getElementById(src).style.background = '#FFFFFF';
        console.log('Removing Down Listener: ' + src);
    }

    if (!((ywhite - 1) < 0)) {
        variablex = xwhite;
        variabley = ywhite - 1;
        src = "img" + variablex + "" + variabley;
        console.log('Removing Left Listener: ' + src);
        document.getElementById(src).style.background = '#FFFFFF';
    }

    if (!((ywhite + 1) >= lon - 1)) {
        variablex = xwhite;
        variabley = ywhite + 1;
        src = "img" + variablex + "" + variabley;
        console.log('Removing Rigth Listener: ' + src);
        document.getElementById(src).style.background = '#FFFFFF';
    }

    createListeners(LON);
}

function a() {

}