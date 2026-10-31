class Scene {
    gameObjects = [];
    mouseWorldPosition
    
    /** @type {GameObject | undefined} */
    lastHovered = undefined

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
        for (const gameObject of [...this.gameObjects]) {
            gameObject.start()
        }
    }

    update() {

        //Collisions
        const collidable = GameObject.findGameObjectsByType(Collider)
        const rigidbodies = GameObject.findGameObjectsByType(Rigidbody)

        // handle mouse over collisions
        let hovered = undefined
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
                    hovered = go
                }
            }
        }
        if (hovered !== this.lastHovered) {
            if (this.lastHovered) {
                this.lastHovered.broadcastMessage("onMouseExit", [])
            }
            if (hovered) {
                hovered.broadcastMessage("onMouseEnter", [])
            }
        }
        if (hovered) {
            hovered.broadcastMessage("onMouseOver", [])
        }
        this.lastHovered = hovered

        // Update all game objects here before collisions with polygons
        for (const gameObject of [...this.gameObjects]) {
            gameObject.update()
        }

        // handle polygon-polygon collisions
        const physicalCollisions = []
        for (let i = 0, len = collidable.length; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
                const mtv = Collisions.isCollisionPolygonPolygon(collidable[i], collidable[j])
                if(mtv) {
                    collidable[i].broadcastMessage("onCollisionStay", [collidable[j], mtv])
                    collidable[j].broadcastMessage("onCollisionStay", [collidable[i], mtv.negate()])

                    if (collidable[i].getComponent(Rigidbody) || collidable[j].getComponent(Rigidbody)) {
                        physicalCollisions.push({one: collidable[i], two: collidable[j], mtv})
                    }
                }
            }
        }

        // handle physics
        for (const collision of physicalCollisions) {
            // loop through all of them, move the objects by the minimum translation vector to resolve the collision
            // both wont always necessarily have a rigidbody, so just move the ones that do have it
            // if both have a rigidbody, move them both by HALF of mtv  
            if (collision.one.getComponent(Rigidbody) && collision.two.getComponent(Rigidbody)) {
                collision.one.transform.position.plusEquals(collision.mtv.scaled(0.5))
                collision.two.transform.position.plusEquals(collision.mtv.negate().scaled(0.5))
            } else if (collision.one.getComponent(Rigidbody)) {
                collision.one.transform.position.plusEquals(collision.mtv)
            } else if (collision.two.getComponent(Rigidbody)) {
                collision.two.transform.position.plusEquals(collision.mtv.negate())
            }

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
