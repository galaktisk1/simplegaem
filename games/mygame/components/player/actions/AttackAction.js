class AttackAction extends PlayerAction {
    swingTime = 0.25
    nextFist = 0
    activeFist
    enter() {
        this.swing = instantiate(new HitboxGameObject(), Vector2.zero)
        this.swing.getComponent(HitboxController).init(this.controller.player, this.controller.weapon)
        this.swing.transform.setParent(this.controller.player.transform)

        // set up for fists if the current weapon is fists
        if (this.controller.weapon?.name === "fists") {
            this.activeFist = this.controller.fists[this.nextFist]
            this.restY = this.activeFist.y
            // alternate fists for each swing
            this.nextFist = 1 - this.nextFist
        }
    }
    update() {
        if (this.controller.actionTimer >= this.swingTime) {
            return this.controller.setAction("move")
        }

        // fist swinging, if current weapon is fists
        if (this.activeFist) {
            const progress = this.controller.actionTimer / this.swingTime
            this.activeFist.y = this.restY - Math.sin(progress * Math.PI) * 40
        }

        this.controller.move(0.5)
        return false
    }

    exit() {
        // reset fist position if swinging with fists
        if (this.activeFist) {
            this.activeFist.y = this.restY
            this.activeFist = null
        }
    }
}