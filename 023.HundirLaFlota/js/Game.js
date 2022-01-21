import { Boat } from './Boat.js';
import { Box } from './Box.js';
import { Sea } from './Sea.js';
class Game {
    constructor(boardSize, boats, canvas, intentos, msg) {
        this.boardSize = boardSize;
        this.boats = boats;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.numIntentos = 0;
        this.intentos = intentos;
        this.impactsToWin = 0;
        this.msg;
        this.HTMLmsg = msg;

        this.board = this.createBoard();
        this.fillBoard();

        //MODO DE JUEGO NORMAL
            this.printBoard();

        //SI QUIERES SABER DÓNDE ESTÁN DESCOMENTA ESTA LINEA
            //this.printResolvedBoard();

        this.detectarClick();
    }

    reset() {
        this.numIntentos = 0;
        this.impactsToWin = 0;
        this.intentos.innerHTML = "Intentos: " + this.numIntentos;
        this.msg = "";
        this.board = this.createBoard();
        this.fillBoard();
        //MODO DE JUEGO NORMAL
        this.printBoard();
        
        //SI QUIERES SABER DÓNDE ESTÁN DESCOMENTA ESTA LINEA
        //this.printResolvedBoard();
    }



    createBoard() {
        let board = new Array(this.boardSize);
        for (let i = 0; i < this.boardSize; i++) {
            board[i] = new Array(this.boardSize);
        }

        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                board[i][j] = new Box(i, j, new Sea("Mar", "rgb(51, 153, 255)"));
            }
        }
        return board;
    }


    fillBoard() {
        for (let i = 0; i < this.boats.length; i++) {
            for (let j = 0; j < this.boats[i].length; j++) {
                this.placeTheBoat(this.boats[i][j]);
            }
        }
    }



    placeTheBoat(boat) {
        let coords = this.getCoords();
        let direction = this.getDirection();

        if (!(this.isPosibleToPlaceTheBoat(boat, coords, direction))) {
            this.placeTheBoat(boat);
        }

    }



    getCoords() {
        let x = Math.floor(Math.random() * (this.boardSize));
        let y = Math.floor(Math.random() * (this.boardSize));
        const coords = {
            x: x,
            y: y
        }
        return coords;
    };



    getDirection() {
        let direction = Math.floor(Math.random() * 4) + 1;
        return direction;
    };



    isPosibleToPlaceTheBoat(boat, coords, direction) {
        let newx;
        let newy;
        let boatSize = boat.getSize() - 1;
        let isPosible = true;

        switch (direction) {
            case 1:
                newx = coords.x;
                newy = coords.y - boatSize;
                break;
            case 2:
                newx = coords.x + boatSize;
                newy = coords.y;
                break;
            case 3:
                newx = coords.x;
                newy = coords.y + boatSize;
                break;
            case 4:
                newx = coords.x - boatSize;
                newy = coords.y;
                break;
        }

        for (let x = coords.x; x <= newx; x++) {
            for (let y = coords.y; y <= newy; y++) {
                if ((x >= this.boardSize) || (y >= this.boardSize) || (x < 0) || (y < 0)) {
                    isPosible = false;
                } else {
                    console.log(x+" "+y)
                    let box = this.board[x][y];
                    if (box.isBoat()) {
                        isPosible = false;
                    }
                }
            }
        }
        if (isPosible) {
            for (let x = coords.x; x <= newx; x++) {
                for (let y = coords.y; y <= newy; y++) {
                    if (!((x || y) > this.boardSize) || ((x || y) < 0)) {
                        this.board[x][y].setBoat(boat);
                        this.impactsToWin++;
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    }



    checkWin(){
        let impacts = 0;
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                if(this.board[i][j].isResolved()){
                    if (this.board[i][j].isBoat()) {
                        impacts++;
                    }
                }
            }
        }

        if (this.impactsToWin <= impacts){
            console.log("win");
            this.ctx.fillStyle = "black";
            this.ctx.font = "bold 40px sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillText("¡ Has Ganado !", this.canvas.width / 2, this.canvas.height / 2);
        }
    }



    detectarClick(){
        this.canvas.addEventListener('click', (e) => {
            let sizeOne = (this.canvas.width / this.boardSize);

            
            this.intentos.innerHTML = "Intentos: " + this.numIntentos;

            let x = e.offsetX;
            let y = e.offsetY;

            for (let i = 0; i < this.boardSize; i++) {
                for (let j = 0; j < this.boardSize; j++) {
                    if (((x > (i * sizeOne)) && (x < (i * sizeOne) + sizeOne))) {
                        if (((y > (j * sizeOne)) && (y < (j * sizeOne) + sizeOne))) {
                            if (!this.board[i][j].isResolved()) {
                                this.numIntentos++;
                                if (this.board[i][j].isBoat()){
                                    this.board[i][j].getItem().impact();
                                    if (this.board[i][j].getItem().isDestroyed()) {
                                        this.msg = "¡ " + this.board[i][j].getItem().getName() + " Hundido !";
                                    }else{
                                        this.msg = "¡ " + this.board[i][j].getItem().getName() + " Tocado !";
                                    }
                                }else{
                                    this.msg = "¡ Mar !";
                                }
                            }else{
                                this.msg = "¡ Ataca a Alguna Casilla !";
                            }
                            this.HTMLmsg.innerHTML = this.msg;

                            this.board[i][j].resolveBox();
                            this.ctx.fillStyle = this.board[i][j].getItem().color;
                            this.ctx.fillRect(i * sizeOne, j * sizeOne, sizeOne, sizeOne);
                            
                        }
                    }
                }

            }
            this.checkWin();
            console.log(this);
        });
    }



    printResolvedBoard(){
        let sizeOne = (this.canvas.width / this.boardSize);
        
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                let color;
                let box = this.board[i][j];
                console.log(box.isBoat())
                if (box.isBoat()) {
                    color = "rgb(255, 24, 102)";
                }else{
                    color = "rgb(102, 153, 153)";
                }

                this.ctx.fillStyle = color;
                this.ctx.fillRect(i * sizeOne, j * sizeOne, sizeOne, sizeOne);
            }
        } 
    }


    printBoard(){
        let sizeOne = (this.canvas.width / this.boardSize);
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                this.ctx.fillStyle = 'rgb(102, 153, 153)';
                this.ctx.fillRect(i * sizeOne, j * sizeOne, sizeOne, sizeOne);
            }
        }
    }
}
export { Game };