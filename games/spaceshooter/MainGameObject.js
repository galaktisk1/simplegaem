class MainGameObject extends GameObject {
    constructor() {
        super()
        this.addComponent(new UpdateComponent())
        this.addComponent(new DrawComponent())
    }
}