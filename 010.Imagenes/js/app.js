const {
    dialog
} = require('@electron/remote')

let imagen = document.getElementById("imagen");
let bul = true;

imagen.addEventListener('click', () => {
    dialog.showErrorBox("Atención", "Va a cambiar la imagen")
    if (bul) {
        imagen.src = "../img/2.jpg";
    } else {
        imagen.src = "../img/1.jpg"
    }
    bul = !bul;

});