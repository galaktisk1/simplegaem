class WallGameObject extends GameObject {
    constructor() {
        super("Wall", ["Wall"], "world")
        this.addComponent(new Polygon(), {
            fillStyle: "#4d4d4d", 
            points: Assets.wall.points
        })
        this.addComponent(new Collider())
        this.transform.scale = Assets.wall.scale
        this.transform.rotation = Assets.wall.rotation
    }
}