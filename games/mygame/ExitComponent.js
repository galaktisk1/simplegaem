class ExitComponent extends Component {
    removeGameObject(player) {
        // filter the player out of the scene's game objects list
        Engine.currentScene.gameObjects = Engine.currentScene.gameObjects.filter(go => go !== player)
        // doesnt remove the lighting game object from player, so ive gotta look into that, but it wont matter in the future
    }

    update() {
        for (const gameObject of Engine.currentScene.gameObjects) {
            if (gameObject instanceof PlayerGameObject) {
                const distanceToExit = this.transform.position.distanceTo(gameObject.transform.position)
                if (distanceToExit < 60) {
                    console.log("Player reached the exit:", gameObject)
                    this.removeGameObject(gameObject)
                }
            }
        }
    }
}