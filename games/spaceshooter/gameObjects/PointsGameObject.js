class PointsGameObject extends GameObject {
    constructor() {
        super("Points", ["Points"], "ui")
        this.addComponent(new PointsController())
        this.addComponent(new TextLabel(), {text: "0"})
    }
}