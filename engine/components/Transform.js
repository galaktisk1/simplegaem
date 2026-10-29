class Transform extends Component {
    position = new Vector2(0, 0)
    scale = new Vector2(1, 1)
    rotation = 0
    _enabled = true

    parent

    setParent(parentTransform) {
        this.parent = parentTransform
    }

    get enabled() {
        return true
    }
    
    set enabled(value) {
        console.warn("Transform component cannot be disabled")
    }

    // Unity up vector equivalent
    get up() {
        return new Vector2(Math.sin(this.rotation), -Math.cos(this.rotation))
    }

    // 2d adaptaion of Unity's Transform.LookAt method
    // this has been updated to account for world position and parent rotation,
    // previously only did local point calculations
    lookAt(targetPosition) {
    const m = this.getWorldMatrix()
    // position is in e and f of the world matrix
    // rotation is in a and b of the world matrix
    const worldPosition = new Vector2(m.e, m.f)
    const direction = targetPosition.minus(worldPosition)
    if (direction.magnitude === 0) return
    const worldAngle = Math.atan2(direction.x, -direction.y)
    const parentRot = this.parent ? this.parent.worldRotation : 0
    this.rotation = worldAngle - parentRot
    }

    getLocalMatrix() {
        let matrix = new DOMMatrix()
        matrix.translateSelf(this.position.x, this.position.y)
        matrix.rotateSelf(this.rotation * 180 / Math.PI)
        matrix.scaleSelf(this.scale.x, this.scale.y)
        return matrix
    }

    getWorldMatrix() {
        if (!this.parent) return this.getLocalMatrix()
        return this.parent.getWorldMatrix().multiply(this.getLocalMatrix())
    }

    get worldPosition() {
        const m = this.getWorldMatrix()
        return new Vector2(m.e, m.f)
    }
    get worldRotation() {
        // again in radians, using the world matrix to extract rotation
        const m = this.getWorldMatrix()
        return Math.atan2(m.b, m.a)
    }

    // from local space to world space
    transformPoint(localPoint) {
        const p = this.getWorldMatrix().transformPoint(localPoint)
        return new Vector2(p.x, p.y)
    }
    // from world space to local space
    inverseTransformPoint(worldPoint) {
        const inv = this.getWorldMatrix().inverse()
        const p = inv.transformPoint(worldPoint)
        return new Vector2(p.x, p.y)
    }
}