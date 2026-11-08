class GenericRoom extends Scene {
    constructor() {
        super()
        this.instantiate(new PlayerGameObject(), new Vector2(110, 110))
        this.instantiate(new InventoryUIGameObject(), new Vector2(20, 20))
        this.instantiate(new MessageManagerGameObject())
        this.instantiate(new PopUpManagerGameObject())
        this.instantiate(new DirectorGameObject())
    }
}
