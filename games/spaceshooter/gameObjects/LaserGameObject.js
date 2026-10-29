class LaserGameObject extends GameObject {
    constructor() {
        super("Laser", [], "lasers")
        this.addComponent(new LaserController)
        this.addComponent(new ProjectileMovementComponent(), { initialSpeed: 3*60 })
        this.addComponent(new Polygon(), {
            fillStyle: "red", points: Assets.triangle
        })
        this.transform.scale = new Vector2(3,8)
    }
}
