class SquareController extends Component {
  speed = 50
  hasJumped = false
  lastJumpTime = -Infinity
  start() {
    this.rigidBody = this.gameObject.getComponent(Rigidbody)
  }

  fixedUpdate() {
    //Check to see if the right arrow key is down.
    //If it is, move our character right
    if (Input.getKey("ArrowRight") || Input.getKey("KeyD"))
      this.transform.position.x = this.transform.position.x + Time.deltaTime * this.speed

    //Check to see if the left arrow key is down.
    //If it is, move our character left
    if (Input.getKey("ArrowLeft") || Input.getKey("KeyA"))
      this.transform.position.x = this.transform.position.x - Time.deltaTime * this.speed

    this.hasJumped = true
  }

  update(){
    if (Input.getKey("Space") && !this.hasJumped) {
      this.rigidBody.velocity.y = -this.speed * 2
      this.lastJumpTime = Time.time
    }
    if (Input.getKey("Space") && Time.time - this.lastJumpTime < 0.3) {
      this.rigidBody.velocity.y = -this.speed * 2
    }
      Camera.main.transform.position = this.transform.position.clone()
  }

  onTriggerStay(other) {
    if (other.name === "CoinGameObject") {
      other.destroy()
    }
  }

  onCollisionStay(other, minimumTransformVector) {
    this.hasJumped = false
  }
}
