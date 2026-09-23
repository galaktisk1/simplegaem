class MessageGameObject extends GameObject {
    constructor() {
        super("Message")
        this.addComponent(new MessageComponent())
    }
}
