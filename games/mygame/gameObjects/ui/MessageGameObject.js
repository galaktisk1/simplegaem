class MessageGameObject extends GameObject {
    constructor() {
        super("Message", ["Message"], "UI")
        this.addComponent(new MessageComponent())
        this.addComponent(new TextLabel(), { fillStyle: "white", textAlign: "center" })
        this.transform.scale = new Vector2(2, 2)
    }
}
