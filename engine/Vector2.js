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

    plus(other) {
        return new Vector2(this.x + other.x, this.y + other.y)
    }

    minus(other) {
        return new Vector2(this.x - other.x, this.y - other.y)
    }

    get magnitude() {
        return Math.hypot(this.x, this.y)
    }

    // comparing 2 vectors by calculating the distance between them
    // https://stackoverflow.com/questions/42755576/javascript-function-distance-between-two-points
    distanceTo(other) {
        return this.minus(other).magnitude
    }

}