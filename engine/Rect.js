class Rect {
    _x
    _y
    _width
    _height

    constructor(xOrPos, yOrSize, width, height) {

        // vector2 constructor
        if (xOrPos instanceof Vector2) {
            this.x = xOrPos.x
            this.y = xOrPos.y
            this._width = yOrSize.x
            this._height = yOrSize.y
            return
        }

        // source copy constructor
        if (xOrPos instanceof Rect) {
            this.x = xOrPos.x
            this.y = xOrPos.y
            this._width = xOrPos.width
            this._height = xOrPos.height
            return
        }

        // default constructor
        this.x = xOrPos
        this.y = yOrSize
        this._width = width
        this._height = height
    }

    static get zero() {
        return new Rect(0, 0, 0, 0)
    }

    static minMaxRect(xMin, yMin, xMax, yMax) {
        return new Rect(xMin, yMin, xMax - xMin, yMax - yMin)
    }

    set(x, y, width, height) {
        this.x = x
        this.y = y
        this._width = width
        this._height = height
    }

    contains(point) {
        return point.x >= this.xMin && point.x < this.xMax
            && point.y >= this.yMin && point.y < this.yMax
    }

    overlaps(other) {
        return this.xMin < other.xMax && this.xMax > other.xMin && this.yMin < other.yMax && this.yMax > other.yMin
    }


    // Getters and setters down below

    get position() {
        return new Vector2(this.x, this.y)
    }

    set position(pos) {
        this.x = pos.x
        this.y = pos.y
    }

    get size() {
        return new Vector2(this.width, this.height)
    }

    set size(size) {
        this._width = size.x
        this._height = size.y
    }
    get center() {
        return new Vector2(this.x + this.width / 2, this.y + this.height / 2)
    }

    set center(center) {
        this.x = center.x - this.width / 2
        this.y = center.y - this.height / 2
    }

    get min() {
        return new Vector2(this.x, this.y)
    }
    set min(value) {
        this.xMin = value.x
        this.yMin = value.y
    }

    get max() {
        return new Vector2(this.x + this.width, this.y + this.height)
    }
    
    set max(value) {
        this.xMax = value.x
        this.yMax = value.y
    }

    get x() {
        return this._x
    }
    set x(value) {
        this._x = value
    }

    get y() {
        return this._y
    }
    set y(value) {
        this._y = value
    }

    get width() {
        return this._width
    }
    set width(value) {
        this._width = value
    }

    get height() {
        return this._height
    }
    set height(value) {
        this._height = value
    }

    get xMin() {
        return this.x
    }
    set xMin(value) {
        const oldXMax = this.x + this.width
        this.x = value
        this.width = oldXMax - this.x
    }
    
    get yMin() {
        return this.y
    }
    set yMin(value) {
        const oldYMax = this.y + this.height
        this.y = value
        this.height = oldYMax - this.y
    }

    get xMax() {
        return this.x + this.width
    }
    set xMax(value) {
        this.width = value - this.x
    }
    
    get yMax() {
        return this.y + this.height
    }
    set yMax(value) {
        this.height = value - this.y
    }
}