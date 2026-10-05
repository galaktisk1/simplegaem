class FloorGameObject extends GameObject {
    constructor() {
        super("Floor", [], "background")
        this.addComponent(new Polygon(), {
            fillStyle: "#303030", 
            points: Assets.floor.points
        })
        this.transform.scale = Assets.floor.scale
        this.transform.rotation = Assets.floor.rotation
    }
}