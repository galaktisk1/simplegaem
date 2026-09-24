class TestTextGameObject extends GameObject { 
    constructor() { 
        super("txt", ["text"])
        this.addComponent(new TextLabel(), {fillStyle: "white"})
        this.transform.scale = new Vector2(2, 2)

    }
}