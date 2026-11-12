class MoveAction extends PlayerAction {
    update() {
        if (this.controller.input.attackPressed) {
            return this.controller.setAction("attack")
        }
        if (this.controller.input.castPressed) {
            return this.controller.setAction("cast")
        }
        if (this.controller.input.restPressed) {
            return this.controller.setAction("rest", 8)
        }
        this.controller.move()
        return false
    }
}