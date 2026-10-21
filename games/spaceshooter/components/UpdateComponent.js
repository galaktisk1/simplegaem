class UpdateComponent extends Component {


    position
    speed
    timeSinceLaser = 0
    start() {
        this.speed = 2 * 60
        this.position = this.transform.position
    }

    update() {
        const player = this.gameObject
        const velocity = player.getComponent(MovementComponent).velocity
        velocity.x = 0
        velocity.y = 0

        // console.log(Input.keysDown)
        this.timeSinceLaser += 1
        // issue for later, if you move diagonally, it adds both x and y, so the speed is faster than moving in one direction.
        if (Input.keysDown.includes("ArrowUp") || Input.keysDown.includes("KeyW")) {
            velocity.y -= this.speed
        }
        if (Input.keysDown.includes("ArrowDown") || Input.keysDown.includes("KeyS")) {
            velocity.y += this.speed
        }
        if (Input.keysDown.includes("ArrowLeft") || Input.keysDown.includes("KeyA")) {
            velocity.x -= this.speed
        }
        if (Input.keysDown.includes("ArrowRight") || Input.keysDown.includes("KeyD")) {
            velocity.x += this.speed
        }

        // if (this.timeSinceLaser > 20 && Input.keysDown.includes("Space")) {
        //     this.timeSinceLaser = 0
        //     instantiate(new LaserGameObject(), this.transform.position.clone())
        // }

        Camera.main.gameObject.transform.position = this.transform.position.clone()
        Camera.main.transform.scale = new Vector2(2, 2)

    }
    onCollisionStay(other) {
        console.log("Collision with", other)
    }
}
