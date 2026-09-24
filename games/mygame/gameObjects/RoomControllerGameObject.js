class RoomControllerGameObject extends GameObject {
    constructor() {
        super("RoomController")
        this.addComponent(new RoomController())
    }
}
