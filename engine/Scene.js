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
        scale = gameObject.transform.scale) {

        gameObject.transform.position = position
        gameObject.transform.rotation = rotation
        gameObject.transform.scale = scale

        this.register(gameObject)

        return gameObject
    }

    /** @param {GameObject} go */
    register(go) {
        if (!this.gameObjects.includes(go)) {
            this.gameObjects.push(go)
        }
        // @ts-ignore
        go.scene = this

        for (const child of go.transform.children) {
            this.register(child.gameObject)
        }
    }

    start() {
        for (const gameObject of [...this.gameObjects]) {
            gameObject.start()
        }
    }

    update() {

        // important this happens before physics
        for (const gameObject of [...this.gameObjects]) {
            // call start on each game object before fixedUpdate
            gameObject.start()
            if (Time.timeScale > 0)
                gameObject.sendMessage("fixedUpdate", [])
        }

        //Collisions
        const collidable = GameObject.findGameObjectsByType(Collider)

        // Broad-phase collsions
        const bodies = collidable.map(go => {
            const collider = go.getComponent(Collider)
            const m = go.transform.getWorldMatrix()
            const points = collider.points.map(p => {
                const q = m.transformPoint(p)
                return new Vector2(q.x, q.y)
            })
            let minX = Infinity
            let minY = Infinity
            let maxX = -Infinity
            let maxY = -Infinity
            for (const point of /** @type {Vector2[]} */ (points)) {
                minX = Math.min(minX, point.x)
                minY = Math.min(minY, point.y)
                maxX = Math.max(maxX, point.x)
                maxY = Math.max(maxY, point.y)
            }
            const center = new Vector2((minX + maxX) / 2, (minY + maxY) / 2)
            // get the rb component here so it doesnt keep happening repeatedly in the collision loop
            return { go, collider, rb: go.getComponent(Rigidbody), points, minX, minY, maxX, maxY, center }
        })

        // now store occluders for raycasting and anyone to use
        this.occluders = []
        for (const body of bodies) {
            if (body.rb || body.collider.isTrigger) continue
            const pts = body.points
            if (pts.length < 2) continue
            if (pts.length === 4) {
                const first = Vector2.distance(pts[0], pts[1])
                const second = Vector2.distance(pts[1], pts[2])
                if (Math.min(first, second) * 4 < Math.max(first, second)) {
                    const mid = (p, q) => new Vector2((p.x + q.x) / 2, (p.y + q.y) / 2)
                    const a = first < second ? mid(pts[0], pts[1]) : mid(pts[1], pts[2])
                    const b = first < second ? mid(pts[2], pts[3]) : mid(pts[3], pts[0])
                    this.occluders.push({ a, b })
                    continue
                }
            }
            for (let i = 0; i < pts.length; i++) {
                this.occluders.push({ a: pts[i], b: pts[(i + 1) % pts.length] })
            }
        }

        // handle mouse over collisions
        /** @type {GameObject | undefined} */
        let hovered = undefined
        this.mouseWorldPosition = undefined
        if (Input.mousePosition) {
            let matrix = new DOMMatrix()
            matrix.translateSelf(Engine.canvas.width / 2, Engine.canvas.height / 2)
            if (Engine.cameraWidthInWorldSpace) {
                const scalar = Engine.cameraWidthInWorldSpace / (Engine.canvas.width - Engine.letterBoxingWidth)
                matrix.scaleSelf(1 / scalar, 1 / scalar)
            }
            matrix.multiplySelf(Camera.main.transform.getWorldMatrix().inverse())

            let worldPositionDOMPoint = matrix.inverse().transformPoint(Input.mousePosition)
            let worldPosition = new Vector2(worldPositionDOMPoint.x, worldPositionDOMPoint.y)
            this.mouseWorldPosition = worldPosition

            // use the same bodies for mouse collsions
            for (const body of bodies) {
                const point = body.go.layer === "UI" ? Input.mousePosition : worldPosition
                if (point.x < body.minX || point.x > body.maxX || point.y < body.minY || point.y > body.maxY) continue
                if (Collisions.isCollisionPointPolygon(point, body.go)) hovered = body.go
            }
        }
        if (hovered !== this.lastHovered) {
            if (this.lastHovered) {
                this.lastHovered.sendMessage("onMouseExit", [])
            }
            if (hovered) {
                hovered.sendMessage("onMouseEnter", [])
            }
        }
        if (hovered) {
            hovered.sendMessage("onMouseOver", [])
        }
        this.lastHovered = hovered


        if (Time.timeScale > 0) {
            // handle polygon-polygon collisions
            const physicalCollisions = []
            for (let i = 0; i < bodies.length; i++) {
                for (let j = i + 1; j < bodies.length; j++) {
                    const a = bodies[i]
                    const b = bodies[j]

                    // cheap checks
                    if (!a.rb && !b.rb) continue
                    if (a.maxX < b.minX || b.maxX < a.minX || a.maxY < b.minY || b.maxY < a.minY) continue

                    // now perform the more expensive polygon-polygon collision check
                    const one = a.go
                    const two = b.go
                    const oneC = a.collider
                    const twoC = b.collider
                    const oneRb = a.rb
                    const twoRb = b.rb
                    const mtv = Collisions.polygonPolygonPoints(a.points, b.points, a.center, b.center)
                    if (mtv) {
                        if (!oneC.isTrigger && !twoC.isTrigger) {
                            one.sendMessage("onCollisionStay", [two, mtv])
                            two.sendMessage("onCollisionStay", [one, mtv.negate()])
                            physicalCollisions.push({ one, two, oneRb, twoRb, mtv })
                        }
                        else {
                            one.sendMessage("onTriggerStay", [two, mtv])
                            two.sendMessage("onTriggerStay", [one, mtv.negate()])
                        }
                    }
                }
            }

            // handle physics
            for (const collision of physicalCollisions) {
                // shortcuts
                const oneRb = collision.oneRb
                const twoRb = collision.twoRb
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
        }

        // this shall happen after physics
        for (const gameObject of [...this.gameObjects]) {
            gameObject.update()
        }

        for (const gameObject of this.gameObjects) {
            if (gameObject.markForDestroy) {
                gameObject.transform.parent?.children.delete(gameObject.transform)
                gameObject.scene = null
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

        //aspect ratio
        Engine.letterBoxingWidth = 0
        Engine.letterBoxingHeight = 0
        if (Engine.aspectRatio) {
            const currentAspectRatio = Engine.canvas.width / Engine.canvas.height
            if (Engine.aspectRatio > currentAspectRatio) {
                const maxHeight = Engine.canvas.width / Engine.aspectRatio
                Engine.letterBoxingHeight = Engine.canvas.height - maxHeight
            }
            else if (Engine.aspectRatio < currentAspectRatio) {
                const maxWidth = Engine.canvas.height * Engine.aspectRatio
                Engine.letterBoxingWidth = Engine.canvas.width - maxWidth
            }
        }

        // start camera code
        ctx.save()
        ctx.translate(Engine.canvas.width / 2, Engine.canvas.height / 2)
        if (Engine.cameraWidthInWorldSpace) {
            const scalar = Engine.cameraWidthInWorldSpace / (Engine.canvas.width - Engine.letterBoxingWidth)
            ctx.scale(1 / scalar, 1 / scalar)
        }
        //ctx.translate(-Camera.main.transform.position.x, -Camera.main.transform.position.y)
        ctx.setTransform(ctx.getTransform().multiply(Camera.main.transform.getWorldMatrix().inverse()))

        for (const layer of Engine.layers.filter(layer => layer !== "UI")) {
            for (const gameObject of this.gameObjects.filter(go => go.layer === layer)) {
                gameObject.draw(ctx)
            }
        }
        ctx.restore()
        // stop camera code

        //letterboxing
        ctx.fillStyle = "black"

        const top = Engine.letterBoxingHeight / 2
        const bottom = Engine.canvas.height - Engine.letterBoxingHeight / 2
        const left = Engine.letterBoxingWidth / 2
        const right = Engine.canvas.width - Engine.letterBoxingWidth / 2

        let width = Engine.canvas.width
        let height = Engine.canvas.height
        // top
        ctx.fillRect(0, 0, width, top)
        // bottom
        ctx.fillRect(0, bottom, width, height - bottom)
        // right
        ctx.fillRect(right, 0, width - right, height)
        // left
        ctx.fillRect(0, 0, left, height)

        // ui layer
        // ctx.translate(0, Engine.letterBoxingHeight / 2)
        for (const gameObject of this.gameObjects.filter(go => go.layer == "UI")) {
            gameObject.draw(ctx)
        }
    }
}

function instantiate(
    gameObject,
    position = gameObject.transform.position,
    rotation = gameObject.transform.rotation,
    scale = gameObject.transform.scale) {
    return SceneManager.currentScene.instantiate(gameObject, position, rotation, scale)
}
