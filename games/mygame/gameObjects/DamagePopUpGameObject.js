class DamagePopUpGameObject extends GameObject {
    constructor() {
        super("damagePopUp", ["PopUp"])
        this.addComponent(new TextLabel(), { fillStyle: "red" })
        this.addComponent(new MovementComponent())
        this.addComponent(new PopUpController())
        this.transform.scale = new Vector2(1, 1)
    }
}