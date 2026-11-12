class RestAction extends PlayerAction {
    drainsFatigue = false
    enter(hours) {
        this.hours = hours
        GameClock.speed = 600 // this is the camping time scale in arena
        this.controller.move(0)
    }
    update() {
        // wake up if you press R again
        if (this.controller.actionTimer > 0 && this.controller.input.restPressed) {
            return this.controller.setAction("move")
        }
        // wake up if fully rested
        if (this.controller.attributes.isFullyRested) {
            return this.controller.setAction("move")
        }
        const attributes = this.controller.attributes
        for (let hour = 0; hour < GameClock.hoursPassed; hour++) {
            attributes.restHour()
            this.hours--
            if (this.hours <= 0) {
                return this.controller.setAction("move")
            }
        }
        this.controller.move(0)
        return false
    }
    
    exit() {
        GameClock.speed = 1 // reset time scale when exiting rest
    }
}