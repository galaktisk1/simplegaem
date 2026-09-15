class MainScene extends Scene {
    constructor() {
        super()
        this.player = this.instantiate(new MainGameObject(), new Vector2(250, 250))
    }
}