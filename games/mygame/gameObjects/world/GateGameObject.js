class GateGameObject extends GameObject {
    constructor() {
        super("Gate", [], "world")
        this.addComponent(new Collider())
        const length = Room.tileSize
        this.addComponent(new Polygon(), {
            fillStyle: "brown",
            points: [
                new Vector2(0, -10),
                new Vector2(length, -10),
                new Vector2(length, 10),
                new Vector2(0, 10)
            ]
        })
        this.addComponent(new GateOpenComponent())
    }
}
