class Game {
    constructor(boardSize, boats){
        this.boardSize = boardSize;
        this.boats = boats;
        this.board = this.createBoard();
        this.fillBoard();
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
                newy = coords.y ;
                break;
        }
        if (((newx || newy) > this.boardSize) || ((newx || newy) < 0)) {
            return false;
        } else {
            for (let x = coords.x; x <= newx; x++) {
                for (let y = coords.y; y <= newy; y++) {
                    if (this.board[x][y] != "Mar") {
                        return false;
                    }
                }
            }
            for (let x = coords.x; x <= newx; x++) {
                for (let y = coords.y; y <= newy; y++) {
                    this.board[x][y] = boat.id;
                    console.log("SI")
                }
            }
            return true;
        }
    }

    placeTheBoat(boat,i) {
        console.log("intento numero: "+i);
        console.log(boat);
        const coords = this.getCoords();
        const direction = this.getDirection();
        if (!(this.isPosibleToPlaceTheBoat(boat, coords, direction))) {
            i++;
            console.log("not is posible");
            this.placeTheBoat(boat,i);
        }else{
            console.log("is posible");
        }
    }

    fillBoard() {
        for (let i = 0; i < this.boats.length; i++) {
            for (let j = 0; j < this.boats[i].length; j++) {
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