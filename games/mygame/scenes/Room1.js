class Room1 extends Scene {
    constructor() {
        super()
        this.instantiate(new RoomControllerGameObject())
        this.instantiate(new FloorGameObject(), new Vector2(450, 425), 0, new Vector2(370, 345))
        this.instantiate(new WallGameObject(), new Vector2(450, 40), 0, new Vector2(450, 40))
        this.instantiate(new WallGameObject(), new Vector2(450, 810), 0, new Vector2(450, 40))
        this.instantiate(new WallGameObject(), new Vector2(40, 425), 0, new Vector2(40, 345))
        this.instantiate(new WallGameObject(), new Vector2(860, 425), 0, new Vector2(40, 345))

        this.instantiate(new KeyGameObject(), new Vector2(300, 400))
        this.instantiate(new ExitGameObject(), new Vector2(650, 160), 0, new Vector2(70, 70))
        this.instantiate(new GateGameObject(), new Vector2(500, 80), Math.PI / 2)
    }
}
