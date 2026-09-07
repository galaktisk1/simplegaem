class PlayerGameObject extends GameObject {
    constructor() {
        super()
        this.addComponent(new PlayerUpdateComponent())
        this.addComponent(new PlayerDrawComponent())
    }
}