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
