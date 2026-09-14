class WallGameObject extends GameObject {
    constructor() {
        super()
        this.addComponent(new Polygon(), {
            fillstyle: "#4d4d4d", points: [
                new Vector2(0, 0),
                new Vector2(250, 0),
                new Vector2(250, 80),
                new Vector2(0, 80)
            ]
        })
    }
}