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

createPuzzle(images, LON);
searchWhite(images, LON);
createListeners(images, LON, xwhite, ywhite);

/*
img0.addEventListener('click',changeImg(images,0,0));
img1.addEventListener('click', changeImg(images, x, y));
img2.addEventListener('click', changeImg(images, x, y));
img3.addEventListener('click', changeImg(images, x, y));
img4.addEventListener('click', changeImg(images, x, y));
img5.addEventListener('click', changeImg(images, x, y));
img6.addEventListener('click', changeImg(images, x, y));
img7.addEventListener('click', changeImg(images, x, y));
img8.addEventListener('click', changeImg(images, x, y));
img9.addEventListener('click', changeImg(images, x, y));
img10.addEventListener('click', changeImg(images, x, y));
img11.addEventListener('click', changeImg(images, x, y));
img12.addEventListener('click', changeImg(images, x, y));
img13.addEventListener('click', changeImg(images, x, y));
img14.addEventListener('click', changeImg(images, x, y));
img15.addEventListener('click', changeImg(images, x, y));*/



function createPuzzle(images, lon) {
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
    seeImgages(images,lon);
    
}
function seeImgages(images, lon) {
    for (let x = 0; x < lon; x++) {
        for (let y = 0; y < lon; y++) {
            let image = images[x][y].toString();
            let src = "img" + x + "" + y;
            document.getElementById(src).src = image;
        }
    }
}

function searchWhite(images, lon) {
    for (let x = 0; x < lon; x++) {
        for (let y = 0; y < lon; y++) {
            if (images[x][y] == "../img/white.jpg") {
                xwhite = x;
                ywhite = y;
                break;
            }
        }
    }
}


function createListeners(images, lon, x, y) {
    let variablex = x;
    let variabley = y;

    if (!((x - 1) < 0)) {
        variablex = x - 1;
        let src = "img" + variablex + "" + variabley;
        document.getElementById(src).addEventListener('click', () => {
            changeImg(images, variablex, variabley, x, y)
        });
        console.log('Up AddEventListener');
    }
    if (!((x + 1) >= lon)) {
        variablex = x + 1;
        let src = "img" + variablex + "" + variabley;
        document.getElementById(src).addEventListener('click', () => {
            changeImg(images, variablex, variabley, x, y)
        });
        console.log('Down AddEventListener');
    }
    if (!((y - 1) < 0)) {
        variabley = y - 1;
        let src = "img" + variablex + "" + variabley;
        document.getElementById(src).addEventListener('click', () => {
            changeImg(images, variablex, variabley, x, y)
        });
        console.log('Left AddEventListener');
    }
    if (!((y + 1) >= lon)) {
        variabley = y + 1;
        let src = "img" + variablex + "" + variabley;
        document.getElementById(src).addEventListener('click', () => {
            changeImg(images, variablex, variabley, x, y)
        });
        console.log('Rigth AddEventListener');
    }
}


function changeImg(images, variablex, variabley, x, y) {
    console.log('Clicked');
    let aux = images[variablex][variabley];
    images[variablex][variabley] = images[x][y];
    images[x][y] = aux;
    seeImgages(images, LON);
}