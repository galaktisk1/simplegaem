class LanternGameObject extends GameObject {
    constructor() {
        super("Lantern", [], "characters")
        this.addComponent(new Polygon(), {
            fillStyle: "yellow",
            points: [
                new Vector2(-10, -10),
                new Vector2(10, -10),
                new Vector2(10, 10),
                new Vector2(-10, 10),
            ]
        })
    }
}
