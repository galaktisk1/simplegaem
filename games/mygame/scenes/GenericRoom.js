class GenericRoom extends Scene {
    constructor() {
        super()
        this.instantiate(new PlayerGameObject(), new Vector2(250, 250))
        this.instantiate(new MessageManagerGameObject())
        this.instantiate(new PopUpManagerGameObject())
    }
}
