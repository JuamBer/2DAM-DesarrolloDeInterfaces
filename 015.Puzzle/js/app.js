const {
    dialog

} = require('@electron/remote');

let img0 = document.getElementById("img0");
let img1 = document.getElementById("img1");
let img2 = document.getElementById("img2");
let img3 = document.getElementById("img3");
let img4 = document.getElementById("img4");
let img5 = document.getElementById("img5");
let img6 = document.getElementById("img6");
let img7 = document.getElementById("img7");
let img8 = document.getElementById("img8");
let img9 = document.getElementById("img9");
let img10 = document.getElementById("img10");
let img11 = document.getElementById("img11");
let img12 = document.getElementById("img12");
let img13 = document.getElementById("img13");
let img14 = document.getElementById("img14");
let img15 = document.getElementById("img15");

createPuzzle();

img0.addEventListener('click',changeImg(images,x,y));
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
img15.addEventListener('click', changeImg(images, x, y));

let images = new Array(4);
for (let i = 0; i < 16; i++) {
    images[i] = new Array(4);
    
}
function createPuzzle(){
    for (let i = 0; i < images.length; i++) {
        if (i == 0) {
            images[i] = "../img/blanco.jpg";
        } else {
            images[i] = "../img/" + i.toString() + ".jpg";
        }
    }

    for (let i = 0; i < images.length; i++) {
        let aux = images[i];
        let ran = Math.round(Math.random() * 15);

        images[i] = images[ran];
        images[ran] = aux;
    }

    for (let i = 0; i < images.length; i++) {
        let image = images[i].toString();
        document.getElementById('img'+i).src = image;
    }
}
function changeImg(){
    
}