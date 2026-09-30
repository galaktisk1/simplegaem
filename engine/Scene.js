class Scene {
    gameObjects = [];

    constructor() {
        let camera = new GameObject("MainCamera", ["MainCamera"])
        camera.addComponent(new Camera())
        this.instantiate(camera)
    }

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
        ctx.fillStyle = Camera.main.backgroundColor
        ctx.fillRect(0, 0, Engine.canvas.width, Engine.canvas.height)

        // start camera code
        ctx.save()
        ctx.translate(Engine.canvas.width / 2, Engine.canvas.height / 2)
        ctx.translate(-Camera.main.gameObject.transform.position.x, -Camera.main.gameObject.transform.position.y)

        for (const layer of Engine.layers.filter(l => l !== "ui")) {
            for (const gameObject of this.gameObjects.filter(go => go.layer == layer)) {
                gameObject.draw(ctx)
            }
        }
        ctx.restore()
        // stop camera code

        // ui layer
        for (const gameObject of this.gameObjects.filter(go => go.layer == "ui")) {
            gameObject.draw(ctx)
        }
    }
}

function instantiate(gameObject, position = gameObject.transform.position, rotation = gameObject.transform.rotation, scale = gameObject.transform.scale) {
    return SceneManager.currentScene.instantiate(gameObject, position, rotation, scale)
}
