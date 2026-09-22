class GateGameObject extends GameObject {
    constructor() {
        super("Gate")
        this.addComponent(new Polygon(), {
            fillStyle: "brown", 
            points: [
                new Vector2(0, -10),
                new Vector2(500, -10),
                new Vector2(500, 10),
                new Vector2(0, 10)
            ]
        })
        this.addComponent(new GateOpenComponent())
    }
}
