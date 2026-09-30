class PopUpGameObject extends GameObject {
    constructor() {
        super("PopUp", ["PopUp"])
        this.addComponent(new TextLabel(), { fillStyle: "white" })
        this.addComponent(new MovementComponent())
        this.addComponent(new PopUpController())
        this.transform.scale = new Vector2(1, 1)
    }
}
