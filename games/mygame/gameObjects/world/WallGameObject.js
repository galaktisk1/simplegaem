class WallGameObject extends GameObject {
    constructor() {
        super("Wall", [], "world")
        this.addComponent(new Polygon(), {
            fillStyle: "#4d4d4d", 
            points: Assets.wall.points
        })
        this.transform.scale = Assets.wall.scale
        this.transform.rotation = Assets.wall.rotation
    }
}