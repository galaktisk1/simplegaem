class LaserGameObject extends GameObject {
    constructor() {
        super()
        this.addComponent(new LaserController)
        this.addComponent(new Polygon(), {
            fillstyle: "red", points: [
                new Vector2(0, -48),
                new Vector2(3, -42),
                new Vector2(3, -30),
                new Vector2(0, -27),
                new Vector2(-3, -30),
                new Vector2(-3, -42)
            ]
        })
    }
}
