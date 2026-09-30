class GenericRoom extends Scene {
    constructor() {
        super()
        this.instantiate(new PlayerGameObject(), new Vector2(250, 250))
        this.instantiate(new MessageManagerGameObject(), new Vector2(400, 80))
        this.instantiate(new PopUpManagerGameObject())
    }
}
