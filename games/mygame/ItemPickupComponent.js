class ItemPickupComponent extends Component {
    
    removeGameObject(gameobject) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        Engine.currentScene.gameObjects = Engine.currentScene.gameObjects.filter(g => g !== gameobject)
    }

    update() {
        // check for nearby items and pick them up automatically
        for (const gameObject of Engine.currentScene.gameObjects) {
            // check for an instance of the player game object
            // and ignore other game objects
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
            if (gameObject instanceof PlayerGameObject) {
                // mark the distance to the player
                const distanceToItem = this.transform.position.distanceTo(gameObject.transform.position)
                if (distanceToItem < 25) {
                    // filter the object from the scene's game objects list
                    this.removeGameObject(this.gameObject)
                    // this is where it will go into the inventory of the player
                }
            }
        }
    }
}