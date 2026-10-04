class PopUpController extends Component {
    speed = 0.5 * 60
    target
    previousTargetPosition


    showPopup(msg, target, lifetime = 1) {
        this.target = target
        this.previousTargetPosition = target.transform.position.clone()
        this.transform.position = target.transform.position.plus(new Vector2(0, -50))
        this.gameObject.getComponent(MovementComponent).velocity = new Vector2(0, -this.speed)
        this.gameObject.getComponent(TextLabel).text = msg
        this.gameObject.lifetime = lifetime
    }

    update() {
        const targetpos = this.target.transform.position
        const displacement = targetpos.minus(this.previousTargetPosition)
        this.transform.position.x += displacement.x
        this.transform.position.y += displacement.y
        this.previousTargetPosition = targetpos.clone()
        this.gameObject.lifetime -= Time.deltaTime
        if (this.gameObject.lifetime <= 0) {
            this.gameObject.destroy()
        }
    }
}
