class Component {
    gameObject
    didStart = false
    markForDestroy = false
    _enabled = true

    get enabled() {return this._enabled}

    set enabled(value) {
        if (this._enabled === value) return
        this._enabled = value
        if (this.gameObject) {
            if (this._enabled) {
                this.onEnable?.()
            } else {
                this.onDisable?.()
            }
        }
    }

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
    
    // so type checing doesnt get mad at me
    onEnable() {}
    onDisable() {}
}