class GenericRoom extends Scene {
    constructor() {
        super()
        this.instantiate(new PlayerGameObject(), new Vector2(250, 250))
        this.instantiate(new MessageGameObject(), new Vector2(400, 80))
    }
}
