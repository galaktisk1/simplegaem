class GateGameObject extends GameObject {
    constructor() {
        super("Gate")
        this.addComponent(new Polygon(), {
            fillstyle: "brown", 
            points: Assets.square
        })
        this.addComponent(new GateOpenComponent())
    }
}