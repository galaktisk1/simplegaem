class FloorGameObject extends GameObject {
    constructor() {
        super("Floor", [], "background")
        this.addComponent(new Polygon(), {
            fillStyle: "#303030", 
            points: Assets.square
        })
    }
}