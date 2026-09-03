class GameObject { 
    components = []

    addComponent(component) {
        this.components.push(component)
        component.gameObject = this
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
}