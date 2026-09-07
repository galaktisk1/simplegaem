class BackgroundGameObject extends GameObject {
    constructor() {
        super()

        this.addComponent(new BackgroundDrawComponent())
    }
}