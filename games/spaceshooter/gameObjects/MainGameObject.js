class MainGameObject extends GameObject {
    constructor() {
        super()
        this.addComponent(new UpdateComponent())
        this.addComponent(new Polygon(), {
            fillstyle: "black", points: [
                new Vector2(0, -32),
                new Vector2(10, -6),
                new Vector2(28, 20),
                new Vector2(9, 14),
                new Vector2(-9, 14),
                new Vector2(-28, 20),
                new Vector2(-10, -6),
            ]
        })
        this.addComponent(new Polygon(), {
            fillstyle: "blue", points: [
                new Vector2(0, -18),
                new Vector2(6, 3),
                new Vector2(0, 9),
                new Vector2(-6, 3),
            ]
        })
    }
}
