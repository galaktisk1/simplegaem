class Component {
    gameObject

    get transform() {
        return this.gameObject.transform
    }

    // always have a reference to the current scenes player
    get player() {
        return Engine.currentScene.player
    }
}