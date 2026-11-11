class MoveAction extends PlayerAction {
    update() {
        this.speed = this.controller.baseMoveSpeed * this.controller.attributes.baseSpeed / 30
        this.controller.movement.velocity = this.controller.input.move.scaled(this.speed)
        return false
    }
}