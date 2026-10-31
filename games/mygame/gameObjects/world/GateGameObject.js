class GateGameObject extends GameObject {
    constructor() {
        super("Gate", [], "world")
        this.addComponent(new Collider())
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
