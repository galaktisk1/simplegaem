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

    dot(other) {
        return this.x * other.x + this.y * other.y
    }

    cross(other) {
        return this.x * other.y - this.y * other.x
    }

    orthogonal() {
        return new Vector2(-this.y, this.x)
    }

    get magnitude() {
        // which is the same as Math.sqrt(this.x**2 + this.y**2)
        return Math.hypot(this.x, this.y)
    }

    static distance(a, b) {
        return a.minus(b).magnitude
    }

    // Unity signedAngle equivalent
    // signed angle between two vectors in radians
    static signedAngle(from, to) {
        const dot = from.dot(to)
        const cross = from.cross(to)
        return Math.atan2(cross, dot)
    }

    static clampMagnitude(vector, maxLength) {
        const length = vector.magnitude
        if (length <= maxLength) return vector.clone()
        const scale = maxLength / length
        return new Vector2(vector.x * scale, vector.y * scale)
    }
}