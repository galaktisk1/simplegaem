class MainScene extends Scene {
    constructor() {
        super()
        this.instantiate(new BackgroundGameObject())
        this.instantiate(new WallGameObject(new Vector2(100, 100), 0))
        this.instantiate(new WallGameObject(new Vector2(100, 100), Math.PI / 2))
        this.instantiate(new WallGameObject(new Vector2(400, 425), Math.PI))
        this.instantiate(new WallGameObject(new Vector2(400, 100), Math.PI / 2))
        this.instantiate(new PlayerGameObject())
    }
}