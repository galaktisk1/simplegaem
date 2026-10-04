class PointsGameObject extends GameObject {
    constructor() {
        super("Points", ["Points"], "UI")
        this.addComponent(new PointsController())
        this.addComponent(new TextLabel(), {text: "0"})
    }
}