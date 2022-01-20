class Game {
    constructor(boardSize, boats, canvas, intentos) {
        this.boardSize = boardSize;
        this.boats = boats;
        this.board = this.createBoard();
        this.fillBoard();
        this.canvas = canvas;
        this.numIntentos = 0;
        this.intentos = intentos;
        this.ctx = this.canvas.getContext('2d');
        this.printBoard();
        this.detectarClick();
    }
    detectarClick(){
        let sizeOne = (this.canvas.width / this.boardSize);

        this.canvas.addEventListener('click', (e) => {
            this.numIntentos++;
            this.intentos.innerHTML = "Intentos: "+ this.numIntentos;

            let x = e.offsetX;
            let y = e.offsetY;

            for (let i = 0; i < this.boardSize; i++) {
                for (let j = 0; j < this.boardSize; j++) {
                    if (((x > (i * sizeOne)) && (x < (i * sizeOne) + sizeOne))) {
                        if (((y > (j * sizeOne)) && (y < (j * sizeOne) + sizeOne))){
                            let color = "rgb(51, 153, 255)";

                            console.log("this.board[i][j]" + this.board[i][j].name)
                            if (this.board[i][j].includes("Lancha")) {
                                color = "rgb(255, 102, 102)";
                            }
                            if (this.board[i][j].includes("Submarino")) {
                                color = "rgb(255, 102, 0)";
                            }
                            if (this.board[i][j].includes("Buque")) {
                                color = "rgb(204, 51, 153)";
                            }
                            if (this.board[i][j].includes("Portaaviones")) {
                                color = "rgb(255, 0, 0)";
                            }


                            this.ctx.fillStyle = color;

                            this.ctx.fillRect(i * sizeOne, j * sizeOne, sizeOne, sizeOne);
                        }
                    }
                }

            }
        });
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
        let boatSize = boat.size - 1;
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
                if (((x || y) > this.boardSize) || ((x || y) < 0)) {
                    if (this.board[x][y] != "Mar") {
                        isPosible = false;
                    }
                }
            }
        }
        if (isPosible) {
            for (let x = coords.x; x <= newx; x++) {
                for (let y = coords.y; y <= newy; y++) {
                    this.board[x][y] = boat.id;
                    console.log("SI")
                }
            }
            return true;
        } else {
            return false;
        }

    }

    placeTheBoat(boat,i) {
        console.log("intento numero: " + i);
        console.log(boat);

        let coords = this.getCoords();
        let direction = this.getDirection();

        if (!(this.isPosibleToPlaceTheBoat(boat, coords, direction))) {
            i++;
            console.log("not is posible");
            this.placeTheBoat(boat, i);
        } else {
            console.log("is posible");
        }
        
    }

    fillBoard() {
        for (let i = 0; i < this.boats.length; i++) {
            for (let j = 0; j < this.boats[i].length; j++) {
                console.log("i: "+i+"; j: "+j);
                this.placeTheBoat(this.boats[i][j],1);
            }
        }
    }

    createBoard() {
        let board = new Array(this.boardSize);
        for (let i = 0; i < this.boardSize; i++) {
            board[i] = new Array(this.boardSize);
        }

        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                board[i][j] = "Mar";
            }
        }
        return board;
    }
}
export { Game };