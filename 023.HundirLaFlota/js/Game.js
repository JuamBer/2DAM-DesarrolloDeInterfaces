class Game {
    constructor(boardSize, boats, canvas){
        this.boardSize = boardSize;
        this.boats = boats;
        this.board = this.createBoard();
        this.fillBoard();
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.printBoats();
    }

    printBoats(){
        let sizeOne = (this.canvas.width-5 / this.boardSize-5);
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                if (this.board[i][j] == "Mar") {
                    this.ctx.fillStyle = 'blue';
                    this.ctx.fillRect(i * sizeOne, j * sizeOne, sizeOne, sizeOne);

                }else{
                    this.ctx.fillStyle = 'green';
                    this.ctx.fillRect(i * sizeOne, j * sizeOne, sizeOne, sizeOne);
                }
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