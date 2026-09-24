class RoomController extends Component {
    start() {
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
