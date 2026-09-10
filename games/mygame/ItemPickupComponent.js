class ItemPickupComponent extends Component {
    

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
                    console.log("Picked up item:", this.gameObject)
                    gameObject.addToInventory(this.gameObject)
                    // where the item will be removed later
                }
            }
        }
    }
}
