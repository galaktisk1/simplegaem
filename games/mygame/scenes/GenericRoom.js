class GenericRoom extends Scene {
    constructor() {
        super()
        this.instantiate(new PlayerGameObject(), new Vector2(400, 400))
        this.instantiate(new MessageManagerGameObject())
        this.instantiate(new PopUpManagerGameObject())
    }
}
