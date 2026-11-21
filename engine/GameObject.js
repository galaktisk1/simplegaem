class GameObject {
    components = []
    markForDestroy = false

    name

    tags = []

    layer = "default"

    scene = null

    get transform() {
        return this.components[0]
    }

    constructor(name, tags = [], layer = "default") {
        this.addComponent(new Transform())
        this.name = name
        this.tags = tags
        this.layer = layer
    }

    addComponent(component, parameters) {
        // if it is written as addComponent(Component) it will still work
        // if this gets a class (typeof class = "function") 
        // instead of an instance (typeof component = "object"), 
        // create an instance of it
        if (typeof component === "function") component = new component()

        // if the component is a Transform and one already exists, 
        // replace it instead of adding a new one
        // for RectTransform
        if (component instanceof Transform && this.components[0]) {
            component.gameObject = this
            Object.assign(component, parameters)
            this.components[0] = component
            return component
        }

        // if a script requires other components, make sure they are added first
        for (const type of component.constructor.requires ?? []) {
            if (!this.getComponent(type)) {
                this.addComponent(new type())
            }
        }

        component.gameObject = this
        Object.assign(component, parameters)
        this.components.push(component)

        // run the awake method if it exists AND its attached to a scene
        if (this.scene && !component.didAwake) {
            component.awake?.()
            component.didAwake = true
            if (component.enabled) {
                component.onEnable?.()
            }
        }

        return component
    }

    getComponent(type) {
        // return this.components.find(function(c){return c instanceof type})
        return this.components.find(c => c instanceof type)
    }

    //Unity-like sendMessage method
    sendMessage(message, args = []) {
        for (const component of this.components) {
            component[message]?.(...args)
        }
    }

    //Unity-like broadcastMessage method
    broadcastMessage(message, args = []) {
        for (const component of this.components) {
            component[message]?.(...args)
        }
        // it talks to its children as well
        for (const child of this.transform.children) {
            child.gameObject.broadcastMessage(message, args)
        }
    }

    start() {
        for (const component of this.components.filter(c => !c.didStart)) {
            if (!component.enabled) continue
            component.start?.()
            component.didStart = true
        }
    }

    update() {
        this.start()
        for (const component of this.components) {
            if (!component.enabled) continue
            component.update?.()
        }
        for (const component of this.components) {
            component.updateCoroutines()
        }
    }

    draw(ctx) {
        ctx.save()
        // this is class rect transform code
        if (this.transform instanceof RectTransformC) {
            if (this.transform.useLetterBoxing) {
                const letterBoxingWidth = Engine.letterBoxingWidth
                const letterBoxingHeight = Engine.letterBoxingHeight
                const canvasWidth = Engine.canvas.width
                const canvasHeight = Engine.canvas.height
                ctx.translate(letterBoxingWidth / 2, letterBoxingHeight / 2)
                ctx.scale((canvasWidth - letterBoxingWidth) / canvasWidth, (canvasHeight - letterBoxingHeight) / canvasHeight)
            }
            else {
                const height = Engine.canvas.height
                const width = Engine.canvas.width


                const upperLeft = new Vector2(
                    width *
                    this.transform.anchorMin.x +
                    this.transform.offsetUpperLeft.x,
                    height *
                    this.transform.anchorMin.y +
                    this.transform.offsetUpperLeft.y
                )
                const lowerRight = new Vector2(
                    width *
                    this.transform.anchorMax.x +
                    this.transform.offsetLowerRight.x,
                    height * this.transform.anchorMax.y + this.transform.offsetLowerRight.y
                )
                this.transform.position = new Vector2(
                    (upperLeft.x + lowerRight.x) / 2,
                    (upperLeft.y + lowerRight.y) / 2)
                this.transform.scale = new Vector2(
                    (lowerRight.x - upperLeft.x) / 2,
                    (lowerRight.y - upperLeft.y) / 2
                )
            }
        }
        ctx.setTransform(ctx.getTransform().multiply(this.transform.getWorldMatrix()))
        for (const component of this.components) {
            if (!component.enabled) continue
            component.draw?.(ctx)
        }
        ctx.restore()
    }

    destroy() {
        if (this.markForDestroy) return
        this.markForDestroy = true
        for (const child of [...this.transform.children])
            child.gameObject.destroy()
    }

    removeDestroyedComponents() {
        for (const component of this.components) {
            if (component.markForDestroy) {
                if (component.enabled) {
                    component.onDisable?.()
                }
                component.onDestroy?.()
            }
        }
        this.components = this.components.filter(c => !c.markForDestroy)

    }

    static find(name) {
        // return SceneManager.currentScene.gameObjects.find(function(go){return go.name === name})
        return SceneManager.currentScene.gameObjects.find(go => go.name === name)
    }

    static findGameObjectsWithTag(tag) {
        // return SceneManager.currentScene.gameObjects.filter(function(go){return go.tags.includes(tag)})
        return SceneManager.currentScene.gameObjects.filter(go => go.tags.includes(tag))
    }

    static findGameObjectsByType(type) {
        // return SceneManager.currentScene.gameObjects.filter(function(go){return go.getComponent(type)})
        return SceneManager.currentScene.gameObjects.filter(go => go.components.find(c => c instanceof type))
    }
}
