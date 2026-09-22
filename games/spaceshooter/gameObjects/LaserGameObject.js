class LaserGameObject extends GameObject {
    constructor() {
        super("Laser")
        this.addComponent(new LaserController)
        this.addComponent(new MovementComponent)
        this.addComponent(new Polygon(), {
            fillStyle: "red", points: Assets.triangle
        },
        this.transform.scale = new Vector2(3,8)
        )
    }
}
