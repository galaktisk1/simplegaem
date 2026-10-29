class Mathf {
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max)
    }
    static get Rad2Deg() {
        return 180 / Math.PI
    }
    static get Deg2Rad() {
        return Math.PI / 180
    }
    static sign(value) {
        return value >= 0 ? 1 : -1
    }
}