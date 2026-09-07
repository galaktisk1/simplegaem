class WallGameObject extends GameObject {
    constructor(pos, rotator) {
        super()
        this.position = pos
        this.rotation = rotator
        this.addComponent(new WallDrawComponent())
    }
}