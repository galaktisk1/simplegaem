class MainGameObject extends GameObject {
    constructor() {
        super("Player", [], "ships")
        this.addComponent(new UpdateComponent())
        this.addComponent(new MovementComponent())
        this.addComponent(new Polygon(), {
            fillStyle: "black", points: Assets.triangle
        })
        this.transform.scale = new Vector2(30, 30)
    }
}
