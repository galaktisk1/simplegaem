class Room2 extends Scene {
    constructor() {
        super()
        this.instantiate(new RoomControllerGameObject())
        this.instantiate(new FloorGameObject(), new Vector2(300, 300), 0, new Vector2(220, 220))
        this.instantiate(new WallGameObject(), new Vector2(300, 40), 0, new Vector2(300, 40))
        this.instantiate(new WallGameObject(), new Vector2(300, 560), 0, new Vector2(300, 40))
        this.instantiate(new WallGameObject(), new Vector2(40, 300), 0, new Vector2(40, 220))
        this.instantiate(new WallGameObject(), new Vector2(560, 300), 0, new Vector2(40, 220))

        this.instantiate(new ExitGameObject(), new Vector2(440, 160), 0, new Vector2(70, 70))
    }
}
