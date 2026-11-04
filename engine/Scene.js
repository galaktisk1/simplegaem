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

        // important this happens before physics
        for (const gameObject of [...this.gameObjects]) {
            gameObject.broadcastMessage("fixedUpdate", [])
        }

        //Collisions
        const collidable = GameObject.findGameObjectsByType(Collider)
        const rigidbodies = GameObject.findGameObjectsByType(Rigidbody)

        // handle mouse over collisions
        /** @type {GameObject | undefined} */
        let hovered = undefined
        this.mouseWorldPosition = undefined
        if(Input.mousePosition){
            let matrix = new DOMMatrix()
            matrix.translateSelf(Engine.canvas.width / 2, Engine.canvas.height / 2)
            matrix.multiplySelf(Camera.main.transform.getWorldMatrix().inverse())

            let worldPositionDOMPoint = matrix.inverse().transformPoint(Input.mousePosition)
            let worldPosition = new Vector2(worldPositionDOMPoint.x, worldPositionDOMPoint.y)
            this.mouseWorldPosition = worldPosition
            
            for (const go of collidable) {
                const point = go.layer === "UI" ? Input.mousePosition : worldPosition
                if (Collisions.isCollisionPointPolygon(point, go)) {
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

        

        // handle polygon-polygon collisions
        const physicalCollisions = []
        for (let i = 0, len = collidable.length; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
                // shortcuts
                const one = collidable[i]
                const two = collidable[j]
                const oneRb = one.getComponent(Rigidbody)
                const twoRb = two.getComponent(Rigidbody)
                const oneC = one.getComponent(Collider)
                const twoC = two.getComponent(Collider)

                if (!oneRb && !twoRb) continue
                
                const mtv = Collisions.isCollisionPolygonPolygon(one, two)
                if(mtv) {
                    if (!oneC.isTrigger && !twoC.isTrigger) {
                        one.broadcastMessage("onCollisionStay", [two, mtv])
                        two.broadcastMessage("onCollisionStay", [one, mtv.negate()])
                        physicalCollisions.push({ one, two, mtv })
                    }
                    else {
                        one.broadcastMessage("onTriggerStay", [two, mtv])
                        two.broadcastMessage("onTriggerStay", [one, mtv.negate()])
                    }
                }
            }
        }

        // handle physics
        for (const collision of physicalCollisions) {
            // shortcuts
            const oneRb = collision.one.getComponent(Rigidbody)
            const twoRb = collision.two.getComponent(Rigidbody)
            const onepos = collision.one.transform.position
            const twopos = collision.two.transform.position

            if (oneRb && twoRb) {
                onepos.plusEquals(collision.mtv.scaled(0.5))
                twopos.plusEquals(collision.mtv.negate().scaled(0.5))
            } else if (oneRb) {
                onepos.plusEquals(collision.mtv)
            } else if (twoRb) {
                twopos.plusEquals(collision.mtv.negate())
            }
        }

        // this shall happen after physics
        for (const gameObject of [...this.gameObjects]) {
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
