import { Boat } from './Boat.js';
import { Game } from './Game.js';

const canvas = document.getElementById('board');
const intentos = document.getElementById('intentos');
const reiniciar = document.getElementById('reiniciar');

const boats = [
    [
        new Boat("1_Lancha", "Lancha", 1, "rgb(255, 102, 102)")
    ],
    [
        new Boat("1_Submarino", "Submarino", 2, "rgb(255, 102, 0)"),
        new Boat("2_Submarino", "Submarino", 2, "rgb(255, 102, 0)"),
        new Boat("3_Submarino", "Submarino", 2, "rgb(255, 102, 0)")
    ],
    [
        new Boat("1_Buque", "Buque", 3, "rgb(204, 51, 153)"),
        new Boat("2_Buque", "Buque", 3, "rgb(204, 51, 153)")
    ],
    [
        new Boat("1_Portaaviones", "Portaaviones", 4, "rgb(255, 0, 0)")
    ]
];
let game;
game = new Game(10, boats, canvas, intentos);

reiniciar.addEventListener("click", () => {
    game.reset();
});




