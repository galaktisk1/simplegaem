class GateOpenComponent extends Component {

    // gate will move or delete in someway later

    hasKey(player) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
        return player.getInventory().some(key => key instanceof KeyGameObject) // find the key
    }

    update() {
        for (const gameObject of Engine.currentScene.gameObjects) {
            if (gameObject instanceof PlayerGameObject) {
                const distanceToGate = this.transform.position.distanceTo(gameObject.transform.position)
                if (distanceToGate < 25 && this.hasKey(gameObject)) {
                    console.log("gate opened")
                    // Figure out one inventory search to find a key, then consume it and open the gate.
                }
            }
        }
    }

}
