class Room1 extends Scene {
    constructor() {
        super()
        this.instantiate(new DungeonBuilderGameObject())
        this.instantiate(new RoomControllerGameObject())

    }
}
