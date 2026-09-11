class MessageGameObject extends GameObject {
    constructor() {
        super()
        this.addComponent(new MessageComponent())
        this.message = "message"
    }
}