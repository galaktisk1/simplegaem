class AttackAction extends PlayerAction {
    swingTime = 0.25
    enter() {
        this.swing = instantiate(new HitboxGameObject(), Vector2.zero)
        this.swing.getComponent(HitboxController).init(this.controller.player, this.controller.weapon)
        this.swing.transform.setParent(this.controller.player.transform)
    }
    update() {
        if (this.controller.actionTimer >= this.swingTime) {
            return this.controller.setAction("move")
        }
        this.controller.move(0.5)
        return false
    }
}