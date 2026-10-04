class TestTextGameObject extends GameObject { 
    constructor() { 
        super("txt", ["text"], "UI")
        this.addComponent(new TextLabel(), {fillStyle: "white"})
        this.transform.scale = new Vector2(2, 2)
    }
}