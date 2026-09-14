class BackgroundGameObject extends GameObject {
    constructor() {
        super()
        this.addComponent(new Polygon(), {
            fillstyle: "#303030", points: [
                new Vector2(0, 0),
                new Vector2(900, 0),
                new Vector2(900, 850),
                new Vector2(0, 850)
            ]
        })
    }
}