class GameObject { 
    components = []
    markForDestroy = false

    get transform() {
        return this.components[0]
    }

    constructor() {
        this.addComponent(new Transform())
    }

    addComponent(component, parameters) {
        Object.assign(component, parameters)
        this.components.push(component)
        component.gameObject = this
        return component
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
}
