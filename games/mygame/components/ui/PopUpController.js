class PopUpController extends Component {
    speed = 0.5 * 60

    showPopup(msg, position, lifetime = 1) {
        const currentPopUp = this.gameObject
        

        currentPopUp.transform.position.x = position.x
        currentPopUp.transform.position.y = position.y - 50

        const txtlabel = currentPopUp.getComponent(TextLabel)
        txtlabel.text = msg
        currentPopUp.lifetime = lifetime
    }

    update() {
        const movement = this.gameObject.getComponent(MovementComponent) 
        if (movement) {
            movement.velocity = new Vector2(0, -this.speed) 
        }
        this.gameObject.lifetime -= Time.deltaTime
        if (this.gameObject.lifetime <= 0) {
            this.gameObject.destroy()
        }
    }
}