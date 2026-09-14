class LaserGameObject extends GameObject {
    constructor() {
        super()
        this.addComponent(new LaserController)
        this.addComponent(new Polygon(), {
            fillstyle: "red", points: [
                new Vector2(0, 0),
                new Vector2(200, 0),
                new Vector2(10, 2),
                new Vector2(0, 2)
            ]
        })
    }
}