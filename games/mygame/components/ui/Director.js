class Director extends Component {
    // manage things that generally need to be constant throughout the game, like restarting when the player is gone
    // this can hold making sure messages are restarted between scenes,
    // or anything else that needs to be consistent throughout the game
    // this could hold spawning enemies within the dungeon
    // essentially, this acts as a global manager for game-wide behaviors


    start() {
        this.restarting = false
        this.player = GameObject.find("Player")
        if (!this.player) return
        this.playerHealth = this.player.getComponent(Health)
    }

    update() {
        if ((!this.player || this.player.markForDestroy) && !this.restarting) {
            this.restarting = true
            this.startCoroutine(this.restartGame())
        }
    }

    *restartGame() {
        yield new WaitForSeconds(5)
        // all behavior on restarting the game
        GameSession.playerhealth = undefined
        GameSession.floor = 0
        GameSession.playerattributes = null
        GameSession.playermaxhealth = undefined
        SceneManager.loadScene(CharacterCreator)
    }
}