class UpdateComponent extends Component {


    position
    speed
    start() { 
        this.timeSinceLaser = 0
        this.speed = 1 * 60
        this.position = this.transform.position
    }

    update() {
        const velocity = this.gameObject.getComponent(MovementComponent).velocity
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
        
        if(this.timeSinceLaser > 10){
            instantiate(new LaserGameObject(), this.transform.position.clone())
            this.timeSinceLaser = 0
        }
    }
}
