class DungeonBuilderGameObject extends GameObject {
    constructor() {
        super("DungeonBuilder")
        this.addComponent(new DungeonBuilderComponent())
        this.addComponent(new RoomBuilderComponent())
    }
}