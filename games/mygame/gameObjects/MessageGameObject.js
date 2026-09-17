class MessageGameObject extends GameObject {
    constructor() {
        super("Message")
        this.addComponent(new MessageComponent())
        this.message = []
    }
    
    showMessage(msg, lifetime = 3){
        this.message.push({text: msg, lifetime: lifetime})
    }
}
