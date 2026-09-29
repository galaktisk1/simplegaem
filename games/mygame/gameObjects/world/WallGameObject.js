class WallGameObject extends GameObject {
    constructor() {
        super("Wall")
        this.addComponent(new Polygon(), {
            fillStyle: "#4d4d4d", 
            points: Assets.square
        })
    }
}