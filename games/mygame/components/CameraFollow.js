class CameraFollow extends Component {
    // this will be a component on the camera itself

    init(target) {
        this.target = target
    }

    start() {
        Camera.main.transform.position = this.target.transform.position.clone()
        Camera.main.transform.scale = Vector2.one
        this.cameraVelocity = Vector2.zero
        this.smoothTime = 0.2
    }
    update() {
        if (!this.target || this.target.markForDestroy) return
        

        this.transform.position = Vector2.smoothDamp(
            this.transform.position,
            this.target.transform.position,
            this.cameraVelocity,
            this.smoothTime,
            Infinity,
            Time.deltaTime
        )

        if (Input.getKeyDown("KeyP")) {
            this.zoomOut()
        }

        if (Input.getKeyDown("KeyO")) {
            this.zoomIn()
        }
    }

    zoomOut() {
        const x = Camera.main.transform.scale.x
        const y = Camera.main.transform.scale.y
        Camera.main.transform.scale = new Vector2(x + 0.5, y + 0.5)
    }

    zoomIn() {
        const x = Camera.main.transform.scale.x
        const y = Camera.main.transform.scale.y
        Camera.main.transform.scale = new Vector2(Math.max(0.5, x - 0.5), Math.max(0.5, y - 0.5))
    }
}