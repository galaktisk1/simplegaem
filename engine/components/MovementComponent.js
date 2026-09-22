// Unreal inspired movement component

class MovementComponent extends Component {
    velocity = new Vector2(0,0)

    update() {
        const transform = this.transform.position

        transform.x += this.velocity.x * Time.deltaTime
        transform.y += this.velocity.y * Time.deltaTime
    }

}
