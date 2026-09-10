class GateOpenComponent extends Component {

    // gate will move or delete in someway later

    update() {
        for (const gameObject of Engine.currentScene.gameObjects) {
            if (gameObject instanceof PlayerGameObject) {
                const distanceToGate = this.transform.position.distanceTo(gameObject.transform.position)
                if (distanceToGate < 25) {
                    console.log("gate opened")
                    // Figure out one inventory search to find a key, then consume it and open the gate.
                }
            }
        }
    }

}
