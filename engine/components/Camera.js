class Camera extends Component {
    backgroundColor = "white"

    static get main() {
        return GameObject.findGameObjectsWithTag("MainCamera")[0].getComponent(Camera)
    }

    get viewMatrix() {
        let matrix = new DOMMatrix()
        matrix.translateSelf(Engine.canvas.width / 2, Engine.canvas.height / 2)
        matrix.multiplySelf(Camera.main.transform.getWorldMatrix().inverse())
        return matrix
    }

    worldToScreenPoint(worldPosition) {
        const point = this.viewMatrix.transformPoint(worldPosition)
        return new Vector2(point.x, point.y)
    }
    
    screenToWorldPoint(screenPosition) {
        const matrix = this.viewMatrix.inverse()
        const point = matrix.transformPoint(screenPosition)
        return new Vector2(point.x, point.y)
    }
}