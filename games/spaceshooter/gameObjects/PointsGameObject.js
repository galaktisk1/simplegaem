class PointsGameObject extends GameObject {
    constructor() {
        super("Points")
        this.addComponent(new PointsController())
        this.addComponent(new TextLabel(), {text: "0"})
    }
}