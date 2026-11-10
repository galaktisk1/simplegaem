class VisionGameObject extends GameObject {
    constructor() {
        super("Vision", [], "lighting")
        this.addComponent(new VisionComponent())
    }
}