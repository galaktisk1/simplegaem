class Scene {
    gameObjects = [];
    mouseWorldPosition

    constructor(backgroundColor) {
        let camera = new GameObject("MainCamera", ["MainCamera"])
        camera.addComponent(new Camera())
        let cameraComp = camera.getComponent(Camera)
        this.instantiate(camera)
        if (backgroundColor) {
            cameraComp.backgroundColor = backgroundColor
        }
    }

    instantiate(
        gameObject,
        position = gameObject.transform.position, 
        rotation = gameObject.transform.rotation, 
        scale = gameObject.transform.scale)
    {
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

        //Collisions
        const collidable = GameObject.findGameObjectsByType(Collider)

        this.mouseWorldPosition = undefined
        if(Input.mousePosition){
            let matrix = new DOMMatrix()
            matrix.translateSelf(Engine.canvas.width / 2, Engine.canvas.height / 2)
            matrix.multiplySelf(Camera.main.transform.getWorldMatrix().inverse())

            let worldPositionDOMPoint = matrix.inverse().transformPoint(Input.mousePosition)
            let worldPosition = new Vector2(worldPositionDOMPoint.x, worldPositionDOMPoint.y)
            this.mouseWorldPosition = worldPosition
            for(const go of collidable){
                if(Collisions.isCollisionPointPolygon(worldPosition, go)) {
                    go.broadcastMessage("onMouseOver", [])
                }
            }
        }

        for (let i = 0, len = collidable.length; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
                if(Collisions.isCollisionsPolygonPolygon(collidable[i], collidable[j])) {
                    collidable[i].broadcastMessage("onCollisionStay", [collidable[j]])
                    collidable[j].broadcastMessage("onCollisionStay", [collidable[i]])
                }
            }
        }

        for (const gameObject of this.gameObjects) {
            gameObject.update()
        }

        for (const gameObject of this.gameObjects) {
            if (gameObject.markForDestroy) {
                for (const component of gameObject.components) {
                    component.markForDestroy = true
                }
            }
            gameObject.removeDestroyedComponents()
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
        //ctx.translate(-Camera.main.transform.position.x, -Camera.main.transform.position.y)
        ctx.setTransform(ctx.getTransform().multiply(Camera.main.transform.getWorldMatrix().inverse()))

        for (const layer of Engine.layers.filter(layer => layer !== "UI")) {
            for (const gameObject of this.gameObjects.filter(go => go.layer === layer)) {
                gameObject.draw(ctx)
            }
        }
        ctx.restore()
        // stop camera code

        // ui layer
        for (const gameObject of this.gameObjects.filter(go => go.layer == "UI")) {
            gameObject.draw(ctx)
        }
    }
}

function instantiate(
    gameObject,
    position = gameObject.transform.position, 
    rotation = gameObject.transform.rotation,
    scale = gameObject.transform.scale)
{
    return SceneManager.currentScene.instantiate(gameObject, position, rotation, scale)
}
