class GameObject { 
    components = []
    markForDestroy = false

    name

    get transform() {
        return this.components[0]
    }

    constructor(name) {
        this.addComponent(new Transform())
        this.name = name
    }

    addComponent(component, parameters) {
        Object.assign(component, parameters)
        this.components.push(component)
        component.gameObject = this
    }

    getComponent(component) {
        // return this.components.find(function(c){return c instanceof component})
        return this.components.find(c => c instanceof component)
    }

    start() {
        for (const component of this.components) {
            component.start?.()
        }
    }

    update() {
        for (const component of this.components) {
            component.update?.()
        }
    }

    draw(ctx) {
        for (const component of this.components) {
            component.draw?.(ctx)
        }
    }

    destroy() { 
        this.markForDestroy = true
    }

    static find(name) {
        // return Engine.currentScene.gameObjects.find(function(go){return go.name === name})
        return Engine.currentScene.gameObjects.find(go => go.name === name)
    }

    static findAll(name) {
        return Engine.currentScene.gameObjects.filter(go => go.name === name)
    }
}
