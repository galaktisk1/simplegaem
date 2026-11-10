class RoomController extends Component {
    start() {
        Camera.main.backgroundColor = "black"
        if (SceneManager.currentScene instanceof Room1) {
            this.dungeonB = GameObject.find("DungeonBuilder")
            this.dungeonBuilder = this.dungeonB.getComponent(DungeonBuilderComponent)
            this.dungeonPopulator = this.dungeonB.getComponent(DungeonPopulatorComponent)
            let placed = this.dungeonBuilder.buildDungeon(new Vector2(0, 0))
            this.dungeonPopulator.populateDungeon(placed)
        }
        // if there is an exit
        this.exit = GameObject.find("Exit")?.getComponent(ExitComponent)
        SceneManager.loadScene(GenericRoom, true)
    }

    update() {
        if (this.exit && this.exit.beenDoneExited) {
            // back and forth room1 to room2
            if (SceneManager.currentScene instanceof Room1) {
                SceneManager.nextScene = Room2
            } else {
                SceneManager.nextScene = Room1
            }
        }
    }
}
