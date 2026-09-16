class LaserGameObject extends GameObject {
    constructor() {
        super("Laser")
        this.addComponent(new LaserController)
        this.addComponent(new Polygon(), {
            fillstyle: "red", points: Assets.triangle
        },
            this.transform.scale = new Vector2(70, 50)
        )
    }
}
