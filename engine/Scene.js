class Scene {
    gameObjects = [];

    instantiate(gameObject, position = gameObject.transform.position, rotation = gameObject.transform.rotation, scale = gameObject.transform.scale) {
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

        const temp = []
        for (const gameObject of this.gameObjects) {
            if (!gameObject.markForDestroy) {
                temp.push(gameObject)
            }
        }
        this.gameObjects = temp
    }

    draw(ctx) {
        for (const gameObject of this.gameObjects) {
            gameObject.draw(ctx)
        }
    }
}

function instantiate(gameObject, position = gameObject.transform.position, rotation = gameObject.transform.rotation, scale = gameObject.transform.scale) {
    return SceneManager.currentScene.instantiate(gameObject, position, rotation, scale)
}
