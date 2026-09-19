class FloorGameObject extends GameObject {
    constructor() {
        super("Floor")
        this.addComponent(new Polygon(), {
            fillstyle: "#303030", 
            points: Assets.square
        })
    }
}