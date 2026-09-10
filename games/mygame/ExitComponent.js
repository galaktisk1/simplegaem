class ExitComponent extends Component {

    update() {
        for (const gameObject of Engine.currentScene.gameObjects) {
            if (gameObject instanceof PlayerGameObject) {
                const distanceToExit = this.transform.position.distanceTo(gameObject.transform.position)
                if (distanceToExit < 60) {
                    console.log("exited")
                    // here is where what will happen on exit happens
                }
            }
        }
    }
}
