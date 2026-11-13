class MoveAction extends PlayerAction {
    update() {
        if (this.controller.input.attackPressed) {
            return this.controller.setAction("attack")
        }
        if (this.controller.input.castPressed) {
            return this.controller.setAction("cast")
        }

        if (this.controller.input.restPressed) {
            const playerPosition = this.controller.player.transform.position
            const enemiesNearby = EnemyController.anyEnemiesNearby(playerPosition, this.controller.safeRestDistance)

            if (enemiesNearby) {
                this.controller.msgmanager.showMessage("You can't rest, enemies are nearby")
            } else {
                return this.controller.setAction("rest", 8)
            }
        }
        this.controller.move()
        return false
    }
}