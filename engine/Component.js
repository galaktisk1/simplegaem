class Component {
    gameObject
    didStart = false
    markForDestroy = false
    _enabled = true
    coroutines = []

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

    // coroutines management
    startCoroutine(routine) {
        const result = routine.next()
        if (!result.done) {
            this.coroutines.push({routine, yielded: result.value})
        }
        return routine
    }
    stopCoroutine(routine) {
        const index = this.coroutines.findIndex(c => c.routine === routine)
        if (index !== -1) {
            this.coroutines.splice(index, 1)
        }
    }
    stopAllCoroutines() {
        this.coroutines = []
    }

    updateCoroutines() {
        for (const r of [...this.coroutines]) {
            if (this.markForDestroy || this.gameObject.markForDestroy) {
                this.stopAllCoroutines()
                return
            }
            if (!this.coroutines.includes(r)) continue
            if (r.yielded instanceof Wait && r.yielded.keepWaiting) continue
            const result = r.routine.next()
            if (result.done) {
                this.stopCoroutine(r.routine)
            } else {
                r.yielded = result.value
            }
        }
    }
    
    // so type checing doesnt get mad at me
    onEnable() {}
    onDisable() {}
}