class UpdateComponent extends Component {

    position

    start() { 
        this.position = new Vector2(250, 250)
    }

    update() {
        // console.log(Input.keysDown)

        // issue for later, if you move diagonally, it adds both x and y, so the speed is faster than moving in one direction.
        if (Input.keysDown.includes("ArrowUp") || Input.keysDown.includes("KeyW")) {
            this.position.y -= 1
        }
        if (Input.keysDown.includes("ArrowDown") || Input.keysDown.includes("KeyS")) {
            this.position.y += 1
        }
        if (Input.keysDown.includes("ArrowLeft") || Input.keysDown.includes("KeyA")) {
            this.position.x -= 1
        }
        if (Input.keysDown.includes("ArrowRight") || Input.keysDown.includes("KeyD")) {
            this.position.x += 1
        }
    }
}
