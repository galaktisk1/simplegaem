class GenericLevel extends Scene {
    constructor() {
        super()
        this.instantiate(new MainGameObject(), new Vector2(300, 300))
        this.instantiate(new PointsGameObject(), new Vector2(10, 10))
    }
}