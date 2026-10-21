class Component {
    gameObject
    didStart = false
    markForDestroy = false

    get transform() {
        return this.gameObject.transform
    }
    
    static destroy(component) {
        if (!component || component.markForDestroy) {
            console.warn("Component destruction is invalid", component)
            return
        }
        if (component instanceof Transform) {
            console.warn("Cannot destroy Transform component")
            return 
        }
        component.markForDestroy = true
    }
}