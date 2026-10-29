class Vector2 {
    // Fields
    x
    y

    get 0() {
        return this.x
    }

    set 0(value) {
        this.x = value
    }

    get 1() {
        return this.y
    }

    set 1(value) {
        this.y = value
    }

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    /** Replaces this vector's x and y values in place. */
    set(newX, newY) {this.x = newX; this.y = newY}

    /** Returns an independent copy of this vector. */
    clone(){
        return new Vector2(this.x, this.y)
    }

    static lerp(a, b, t) {
        t = Math.min(Math.max(0, t), 1)
        return new Vector2(
            a.x + (b.x - a.x) * t,
            a.y + (b.y - a.y) * t
        )
    }

    static lerpUnclamped(a, b, t) {
        return new Vector2(
            a.x + (b.x - a.x) * t,
            a.y + (b.y - a.y) * t
        )
    }

    static moveTowards(current, target, maxDistanceDelta) {
        const toVector = target.minus(current)
        const dist = toVector.magnitude
        if (dist <= maxDistanceDelta || dist === 0) {
            return target.clone()
        }
        return current.plus(toVector.scaled(maxDistanceDelta / dist))
    }

    /**
     * Multiplies matching coordinates, unlike scaled() which takes one number.
     * @param {Vector2} a 
     * @param {Vector2} b 
     * @returns {Vector2} A new vector containing (a.x * b.x, a.y * b.y).
     */
    static scale(a, b) {
        return new Vector2(a.x * b.x, a.y * b.y)
    }

    /** Normalizes this vector in place; leaves a zero vector unchanged. */
    normalize() {
        const mag = this.magnitude
        if (mag === 0) return
        this.x /= mag
        this.y /= mag
    }

    /** Returns a unit-length copy, or a zero vector if this vector is zero. */
    get normalized() { 
        const mag = this.magnitude
        if (mag === 0) return Vector2.zero
        return new Vector2(this.x / mag, this.y / mag)
    }

    equals(other) {
        return this.x === other.x && this.y === other.y
    }

    static reflect(inDirection, inNormal) {
        // needs to be normalized
        inNormal = inNormal.normalized
        // v = inDirection - 2 * inNormal * dot(inDirection inNormal)
        const factor = -2 * Vector2.dot(inNormal, inDirection)
        return inDirection.plus(inNormal.scaled(factor))
    }

    static perpendicular(inDirection) {
        // counter clockwise perpendicular
        return new Vector2(inDirection.y, -inDirection.x)
    }

    /**
     * Returns the scalar dot product; positive means similar directions, negative opposing.
     * @param {Vector2} lhs First vector.
     * @param {Vector2} rhs Second vector.
     * @returns {number}
     */
    static dot(lhs, rhs) {
        return lhs.x * rhs.x + lhs.y * rhs.y
    }

    /**
     * Returns the scalar 2D cross product (x1 * y2 - y1 * x2).
     * @param {Vector2} lhs First vector.
     * @param {Vector2} rhs Second vector.
     * @returns {number} Positive for a clockwise turn.
     */
    static cross(lhs, rhs) {
        return lhs.x * rhs.y - lhs.y * rhs.x
    }

    get magnitude() {
        // which is the same as Math.sqrt(this.x**2 + this.y**2)
        return Math.hypot(this.x, this.y)
    }
    get sqrMagnitude() {
        return this.x * this.x + this.y * this.y
    }

    /**
     * Returns the unsigned angle in radians, from 0 to Math.PI; zero if either vector is zero.
     * @param {Vector2} from Starting direction.
     * @param {Vector2} to Target direction.
     * @returns {number}
     */
    static angle(from, to) {
        const denominator = from.sqrMagnitude * to.sqrMagnitude
        if (denominator === 0) return 0
        let magProduct = Math.sqrt(denominator)
        const dot = Mathf.clamp(Vector2.dot(from, to) / magProduct, -1, 1)
        return Math.acos(dot) * Mathf.Rad2Deg
    }

    /**
     * Returns the signed angle in radians, from -Math.PI to Math.PI.
     * @param {Vector2} from Starting direction.
     * @param {Vector2} to Target direction.
     * @returns {number} Positive for clockwise turns in canvas coordinates.
     */
    static signedAngle(from, to) {
        const unsignedAngle = Vector2.angle(from, to)
        const sign = Mathf.sign(Vector2.cross(from, to))
        return unsignedAngle * sign
    }

    /** Returns the distance between positions a and b. */
    static distance(a, b) {
        return a.minus(b).magnitude
    }

    /**
     * Returns a copy limited to maxLength, preserving direction and shorter lengths.
     * @param {Vector2} vector Vector to limit.
     * @param {number} maxLength Nonnegative maximum length.
     * @returns {Vector2}
     */
    static clampMagnitude(vector, maxLength) {
        const length = vector.magnitude
        if (length <= maxLength) return vector.clone()
        const scale = maxLength / length
        return new Vector2(vector.x * scale, vector.y * scale)
    }

    static min(lhs, rhs) {
        return new Vector2(
            Math.min(lhs.x, rhs.x),
            Math.min(lhs.y, rhs.y)
        )
    }

    static max(lhs, rhs) {
        return new Vector2(
            Math.max(lhs.x, rhs.x),
            Math.max(lhs.y, rhs.y)
        )
    }

    // omega cojone, used for smooth damping calculations
    /**
     * Smoothly approaches target without overshooting, updating currentVelocity in place.
     * @param {Vector2} current Current position; left unchanged.
     * @param {Vector2} target Desired position; left unchanged.
     * @param {Vector2} currentVelocity Velocity state to keep between calls, initially zero.
     * @param {number} smoothTime Approximate settling time in seconds; smaller is more responsive.
     * @param {number} maxSpeed Nonnegative speed limit; use Infinity for no limit.
     * @param {number} deltaTime Elapsed seconds for this step, usually Time.deltaTime.
     * @returns {Vector2} The new position to assign to the moving object.
     */
    static smoothDamp(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
        // read from page 99 of Game Programming Gems 4 Chapter 1.10
        smoothTime = Math.max(0.0001, smoothTime)
        const omega = 2 / smoothTime
        const x = omega * deltaTime
        const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)

        const change = Vector2.clampMagnitude(current.minus(target), maxSpeed * smoothTime)
        const adjustedTarget = current.minus(change)
        const temp = currentVelocity.plus(change.scaled(omega)).scaled(deltaTime)

        const nextVelocity = currentVelocity.minus(temp.scaled(omega)).scaled(exp)
        currentVelocity.set(nextVelocity.x, nextVelocity.y)
        const output = adjustedTarget.plus(change.plus(temp).scaled(exp))

        if (Vector2.dot(target.minus(current), output.minus(target)) > 0) {
            currentVelocity.set(0, 0)
            return target.clone()
        }
        return output
    }

    /** Returns a new vector containing this vector plus other. */
    plus(other) {
        return new Vector2(this.x + other.x, this.y + other.y)
    }

    /** Adds other in place and returns this vector. */
    plusEquals(other) {
        this.x += other.x
        this.y += other.y
        return this
    }

    /** Returns a new vector containing this vector minus other. */
    minus(other) {
        return new Vector2(this.x - other.x, this.y - other.y)
    }

    /** Returns a new vector with both signs reversed. */
    negate() {
        return this.scaled(-1)
    }

    /** Returns a new vector with both coordinates multiplied by scalar. */
    scaled(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar)
    }

    static get zero() {return new Vector2(0, 0)}
    static get one() {return new Vector2(1, 1)}
    static get up() {return new Vector2(0, -1)}
    static get down() {return new Vector2(0, 1)}
    static get left() {return new Vector2(-1, 0)}
    static get right() {return new Vector2(1, 0)}
}
