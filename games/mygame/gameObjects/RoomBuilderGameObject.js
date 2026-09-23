class RoomBuilderGameObject extends GameObject {
    constructor() {
        super("RoomBuilder")
        this.addComponent(new RoomBuilderComponent())
    }
}
