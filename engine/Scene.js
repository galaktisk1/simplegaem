class Scene {
    gameObjects = [];

    instantiate(gameObject, position = new Vector2(0,0), rotation = 0, scale = new Vector2(1,1)) {
        this.gameObjects.push(gameObject)
        gameObject.transform.position = position
        gameObject.transform.rotation = rotation
        gameObject.transform.scale = scale
        return gameObject
    }

    start() {
        for (const gameObject of this.gameObjects) {
            gameObject.start()
        }
    }

    update() {
        for (const gameObject of this.gameObjects) {
            gameObject.update()
        }
    }

    draw(ctx) {
        for (const gameObject of this.gameObjects) {
            gameObject.draw(ctx)
        }
    }
}

function instantiate(gameObject, position = new Vector2(0, 0), rotation = 0, scale = new Vector2(1, 1)) {
    Engine.currentScene.instantiate(gameObject, position, rotation, scale)
}