class PopUpGameObject extends GameObject {
    constructor() {
        super("PopUp", ["PopUp"], "popups")
        this.addComponent(new TextLabel(), { fillStyle: "white", textAlign: "center" })
        this.addComponent(new MovementComponent())
        this.addComponent(new PopUpController())
        this.transform.scale = new Vector2(1, 1)
    }
}
