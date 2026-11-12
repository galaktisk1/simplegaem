class CastAction extends PlayerAction {
    castTime = 0.3
    // casting will become its own action state:
    // press C, the game pauses and a magic menu opens,
    // select a spell, then aim it while the game is still paused,
    // click to fire, and the game resumes
    enter() {
        const fireball = instantiate(new FireballGameObject(), this.controller.player.transform.position.clone())
        fireball.launch(this.controller.player.transform.up)
    }
    update() {
        if (this.controller.actionTimer >= this.castTime) {
            return this.controller.setAction("move")
        }
        this.controller.move(0.7)
        return false
    }
}