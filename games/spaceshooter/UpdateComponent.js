class UpdateComponent extends Component {


    position

    start() { 
        this.timeSinceLaser = 0
        this.position = this.transform.position
    }

    update() {
        // console.log(Input.keysDown)
        this.timeSinceLaser += 1
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
        
        if(this.timeSinceLaser > 10){
            instantiate(new LaserGameObject(), this.transform.position.clone())
            this.timeSinceLaser = 0
        }
    }
}
