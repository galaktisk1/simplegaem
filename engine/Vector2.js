class Vector2 { 

    x
    y

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    clone(){
        return new Vector2(this.x, this.y)
    }

}