class MessageGameObject extends GameObject {
    constructor() {
        super()
        this.addComponent(new MessageComponent())
        this.message = "message"
    }
    
    showMessage(msg){
        clearTimeout(this.msgTimeout)
        this.message = msg
        this.msgTimeout = setTimeout(h => {this.message = ""}, 3000)
    }
}