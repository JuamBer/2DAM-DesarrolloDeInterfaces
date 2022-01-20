class Box {
    constructor(x, y, item) {
        this.x = x;
        this.y = y;
        this.item = item;
        this.resolved = false;
    }

    getItem(){
        return this.item;
    }

    resolveBox() {
        this.resolved = true;
        return this.resolved;
    }

    isBoat(){
        let isBoat = false;
        if (!(this.item.name == "Mar")){
            isBoat = true;
        }
        return isBoat;
    }

    isResolved() {
        return this.resolved;
    }

    setBoat(boat){
        this.item = boat;
    }
}

export {
    Box
};