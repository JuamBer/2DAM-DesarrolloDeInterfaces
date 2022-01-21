class Boat {
    
    constructor(id,name,size,color){
        this.id = id;
        this.name = name;
        this.color = color;
        this.status = new Array(size);
        for(let i = 0; i < size; i++){
            this.status[i] = 0;
        }
    }
    impact(){
        for (let i = 0; i < this.getSize(); i++) {
            if (this.status[i] == 0) {
                this.status[i] = 1;
                return true;
            }
        }
    }

    getSize(){
        return this.status.length;
    }
    getName(){
        return this.name;
    }

    getBoatStatus(){
        return this.status;
    }
    
    isDestroyed(){
        let impacts = 0;
        for (let i = 0; i < this.getSize(); i++) {
            if(this.status[i] == 1){
                impacts++;
            }
        }
        if (impacts >= this.status.length){
            return true;
        }else{
            return false;
        }
    }
}

export { Boat };