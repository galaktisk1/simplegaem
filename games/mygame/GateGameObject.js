class GateGameObject extends GameObject {
    constructor() {
        super()
        this.addComponent(new Polygon(), {
            fillstyle: "brown", points: [
                new Vector2(-50, -10),
                new Vector2(50, -10),
                new Vector2(50, 10),
                new Vector2(-50, 10),
            ]
        })
        this.addComponent(new GateOpenComponent())
    }
}