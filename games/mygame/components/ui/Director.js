class Director extends Component {
    // manage things that generally need to be constant throughout the game, like restarting when the player is gone
    // this can hold making sure messages are restarted between scenes,
    // or anything else that needs to be consistent throughout the game
    // this could hold spawning enemies within the dungeon
    // essentially, this acts as a global manager for game-wide behaviors
    update() {
        if(!GameObject.find("Player")) {
            this.startCoroutine(this.restartGame())
        }
    }
    *restartGame() {
        yield new WaitForSeconds(5)
        SceneManager.loadScene(TestRoom)
    }
}