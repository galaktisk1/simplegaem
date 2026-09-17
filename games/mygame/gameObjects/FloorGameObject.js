class FloorGameObject extends GameObject {
    constructor() {
        super("floor")
        this.addComponent(new Polygon(), {
            fillstyle: "#303030", 
            points: Assets.square
        })
    }
}