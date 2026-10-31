class Wait {
    /** 
     * @type {boolean}
     */
    get keepWaiting() {
        throw new Error("keepWaiting must be implemented by subclass")  
    }
}
class WaitForSeconds extends Wait {
    constructor(seconds) {
        super()
        this.endTime = Time.timeSinceStart + seconds
    }

    get keepWaiting() {
        return Time.timeSinceStart < this.endTime
    }
}