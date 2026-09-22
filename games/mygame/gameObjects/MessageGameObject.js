class MessageGameObject extends GameObject {
    constructor() {
        super("Message")
        this.addComponent(new MessageComponent())
        this.message = []
    }
    
    showMessage(msg, lifetime = 3){
        const currentScene = Engine.currentScene
        const currentmsg = currentScene.instantiate(new TestTextGameObject(msg))
        
        this.message.push({gameObject: currentmsg, lifetime: lifetime})
    }
}
