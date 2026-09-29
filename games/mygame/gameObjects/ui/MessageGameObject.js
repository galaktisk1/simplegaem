class MessageGameObject extends GameObject {
    constructor() {
        super("Message")
        this.addComponent(new MessageComponent())
        this.addComponent(new TextLabel(), { fillStyle: "white" })
        this.transform.scale = new Vector2(2, 2)
    }
}
