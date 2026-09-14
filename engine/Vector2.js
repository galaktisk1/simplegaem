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

    // comparing 2 vectors by calculating the distance between them
    // https://stackoverflow.com/questions/42755576/javascript-function-distance-between-two-points
    distanceTo(other) {
        const dx = this.x - other.x
        const dy = this.y - other.y
        return Math.hypot(dx, dy)
    }

}