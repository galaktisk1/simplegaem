class MessageManagerGameObject extends GameObject {
    constructor() {
        super("MessageManager")
        this.addComponent(new MessageManager())
    }
}