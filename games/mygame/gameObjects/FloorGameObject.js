class FloorGameObject extends GameObject {
    constructor() {
        super("Floor")
        this.addComponent(new Polygon(), {
            fillStyle: "#303030", 
            points: Assets.square
        })
    }
}