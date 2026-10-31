// Unreal inspired movement component
class MovementComponent extends Component {
    static requires = [Rigidbody]

    onCollisionStay(other, mtv) {
        const normal = mtv.normalized
        const speedIntoNormal = Vector2.dot(this.velocity, normal)
        if (speedIntoNormal < 0) {
            this.velocity = this.velocity.minus(normal.scaled(speedIntoNormal))
        }
    }
    
    moveTowards(targetPosition, speed) {
        const currentPosition = this.transform.position
        const maxDistanceDelta = speed * Time.deltaTime
        const distance = targetPosition.minus(currentPosition).magnitude
        if (distance == 0 || Time.deltaTime <= 0) {
            this.velocity = Vector2.zero;
            return;
        }
        const nextPosition = Vector2.moveTowards(currentPosition, targetPosition, maxDistanceDelta)
        const nextVelocity = nextPosition.minus(currentPosition).scaled(1 / Time.deltaTime)
        this.velocity = nextVelocity
    }

    get velocity() {
        return this.gameObject.getComponent(Rigidbody).velocity
    }
    set velocity(value) {
        this.gameObject.getComponent(Rigidbody).velocity = value
    }
    get gravity() {
        const rb = this.gameObject.getComponent(Rigidbody)
        return rb.gravity
    }
    set gravity(value) {
        const rb = this.gameObject.getComponent(Rigidbody)
        rb.gravity = value
    }
}
