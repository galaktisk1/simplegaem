class WallGameObject extends GameObject {
    constructor(pos, rotator, scale = new Vector2(1, 1)) {
        super()
        this.position = pos
        this.rotation = rotator
        this.scale = scale
        this.addComponent(new WallDrawComponent())
    }
}