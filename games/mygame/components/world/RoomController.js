class RoomController extends Component {
    start() {
        Camera.main.backgroundColor = "black"
        if (SceneManager.currentScene instanceof Room1) {
            this.dungeonBuilder = GameObject.find("DungeonBuilder").getComponent(DungeonBuilderComponent)
            this.dungeonBuilder.buildDungeon(new Vector2(0, 0))
        }
        SceneManager.loadScene(GenericRoom, true)
    }

    update() {
        const exit = GameObject.find("Exit")
        if (exit && exit.getComponent(ExitComponent).beenDoneExited) {
            // back and forth room1 to room2
            if (SceneManager.currentScene instanceof Room1) {
                SceneManager.nextScene = Room2
            } else {
                SceneManager.nextScene = Room1
            }
        }
    }
}
