class Color {
    constructor(r, g, b, a = 1) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }

    toString() {
        if (this.a === 1) {
            return `rgb(${Math.round(this.r * 255)}, ${Math.round(this.g * 255)}, ${Math.round(this.b * 255)})`
        } else {
            return `rgba(${Math.round(this.r * 255)}, ${Math.round(this.g * 255)}, ${Math.round(this.b * 255)}, ${this.a})`
        }
    }

    multiply(other) {
        return new Color(
            this.r * other.r,
            this.g * other.g,
            this.b * other.b,
            this.a * other.a
        )
    }

    static from32(r, g, b, a = 255) {
        return new Color(r / 255, g / 255, b / 255, a / 255)
    }

    static get white() { return new Color(1, 1, 1) }
    static get black() { return new Color(0, 0, 0) }
    static get red() { return new Color(1, 0, 0) }
    static get green() { return new Color(0, 1, 0) }
    static get blue() { return new Color(0, 0, 1) }
    static get yellow() { return new Color(1, 0.92, 0.016) } // Unity yellow
    static get cyan() { return new Color(0, 1, 1) }
    static get magenta() { return new Color(1, 0, 1) }
    static get gray() { return new Color(0.5, 0.5, 0.5) }
    static get clear() { return new Color(0, 0, 0, 0) }
}