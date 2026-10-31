class GameObject {
    components = []
    markForDestroy = false

    name

    tags = []

    layer = "default"

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
        // if a script requires other components, make sure they are added first
        for(const type of component.constructor.requires ?? []) {
            if (!this.getComponent(type)) {
                this.addComponent(new type())
            }
        }
        component.gameObject = this
        Object.assign(component, parameters)
        this.components.push(component)
        // run the awake method if it exists
        component.awake?.()
        if (component.enabled) {
            component.onEnable?.()
        }
    }

    getComponent(type) {
        // return this.components.find(function(c){return c instanceof type})
        return this.components.find(c => c instanceof type)
    }

    broadcastMessage(message, args = []) { 
        for (const component of this.components) {
            component[message]?.(...args)
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
        const children = SceneManager.currentScene.gameObjects.filter(go => go.transform.parent === this.transform)
        for (const child of children) {
            child.destroy()
        }
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
