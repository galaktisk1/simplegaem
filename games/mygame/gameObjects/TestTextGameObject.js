class TestTextGameObject extends GameObject { 
    constructor(msg) { 
        super("debugtxt")
        this.addComponent(new TextLabel(), { text: msg })
    }
}