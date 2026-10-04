class RoomControllerGameObject extends GameObject {
    constructor() {
        super("RoomController")
        this.addComponent(new RoomBuilderComponent())
        this.addComponent(new RoomController())
    }
}
