class RestAction extends PlayerAction {
    drainsFatigue = false
    encountersHourly = true

    enter() {
        this.hoursElapsed = 0
        GameClock.speed = 600
        this.hourMsg = this.controller.msgmanager.showMessage("You rest...", 99999)
    }

    update() {
        if (this.controller.actionTimer > 0 && this.controller.input.restPressed) {
            return this.controller.setAction("move")
        }
        if (this.controller.attributes.isFullyRested) {
            return this.controller.setAction("move")
        }
        const playerPosition = this.controller.player.transform.position
        if (EnemyController.anyEnemiesNearby(playerPosition, this.controller.safeRestDistance)) {
            this.controller.msgmanager.showMessage("You are awakened by an enemy")
            return this.controller.setAction("move")
        }

        for (let i = 0; i < GameClock.hoursPassed; i++) {
            this.controller.attributes.restHour()
            this.hoursElapsed++
            const n = this.hoursElapsed
            this.hourMsg.gameObject.getComponent(TextLabel).text =
                `${n} hour${n === 1 ? "" : "s"} passed`
            if (this.controller.attributes.isFullyRested) {
                return this.controller.setAction("move")
            }
        }
        this.controller.move(0)
        return false
    }

    exit() {
        this.hourMsg?.gameObject.destroy()
        this.hourMsg = null
        GameClock.speed = 1
        if (this.controller.attributes.isFullyRested) {
            this.controller.msgmanager.showMessage("Fully healed!!")
        }
    }
}