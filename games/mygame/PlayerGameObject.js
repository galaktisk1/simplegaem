class PlayerGameObject extends GameObject {
    constructor() {
        super()
        this.addComponent(new PlayerUpdateComponent())
        // player circle
        this.addComponent(new Circle(), {
            radius: 50,
            fillstyle: "grey",
        })
        // lantern
        this.addComponent(new Polygon(), {
            fillstyle: "yellow", points: [
                new Vector2(-48, -10),
                new Vector2(-28, -10),
                new Vector2(-28, 10),
                new Vector2(-48, 10),
            ]
        })
    }
}