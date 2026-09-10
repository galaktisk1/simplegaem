class GateOpenComponent extends Component {

    removeGameObject(gameobject) {
        Engine.currentScene.gameObjects = Engine.currentScene.gameObjects.filter(g => g !== gameobject)
    }

    checkForKey(gameObject) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
        return gameObject.getInventory().some(item => item instanceof KeyGameObject)
    }
    
    update() {
        for (const gameObject of Engine.currentScene.gameObjects) {
            if (gameObject instanceof PlayerGameObject) {
                const key = gameObject.getInventory().find(item => item instanceof KeyGameObject)
                const distanceToGate = (gate) => this.transform.position.distanceTo(gate.transform.position)
                if (distanceToGate(gameObject) < 25 && this.checkForKey(gameObject)) {
                    console.log("opening gate with item:", gameObject.getInventory())
                    gameObject.useItem(key)
                    console.log(`Gate deleted, and key ${key} consumed`)
                    this.removeGameObject(this.gameObject)
                }
            }
        }
    }

}