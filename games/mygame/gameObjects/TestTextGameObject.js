class TestTextGameObject extends GameObject { 
    constructor() { 
        super("debugtxt")
        this.addComponent(new TextLabel())
    }
}