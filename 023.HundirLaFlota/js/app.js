import { Boat } from './Boat.js';
import { Game } from './Game.js';

const canvas = document.getElementById('myCanvas');
const intentos = document.getElementById('intentos');
const reiniciar = document.getElementById('reiniciar');

const boats = [
    [
        new Boat("1_Lancha","Lancha",1)
    ],
    [
        new Boat("1_Submarino", "Submarino", 2),
        new Boat("2_Submarino", "Submarino", 2),
        new Boat("3_Submarino", "Submarino", 2)
    ],
    [
        new Boat("1_Buque", "Buque", 3),
        new Boat("2_Buque", "Buque", 3)
    ],
    [
        new Boat("1_Portaaviones", "Portaaviones", 4)
    ]
];

let game = new Game(10, boats, canvas, intentos);
console.log(game);
reiniciar.addEventListener("click", () => {
    game = new Game(10, boats, canvas, intentos);
    console.log(game);
});




