class Transform extends Component {
    position = new Vector2(0, 0)
    scale = new Vector2(1, 1)
    rotation = 0

    parent

    setParent(parentTransform) {
        this.parent = parentTransform
    }

    // Unity up vector equivalent
    get up() {
        return new Vector2(Math.sin(this.rotation), -Math.cos(this.rotation))
    }

    // 2d adaptaion of Unity's Transform.LookAt method
    lookAt(targetPosition) {
    const direction = targetPosition.minus(this.position)
    if (direction.magnitude === 0) return
    // vector is (0, -1) for up direction
    const angle = Vector2.signedAngle(new Vector2(0, -1), direction)
    this.rotation = angle
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
}