class MainScene extends Scene {
    constructor() {
        super()
        const room = { width: 900, height: 850, wall: 80 }
        const layout = RoomGeneration.generate(room)
        const floor = layout.floor
        this.instantiate(new FloorGameObject(), floor.position, floor.rotation, floor.scale)
        this.createWalls(layout.walls)
        
        this.instantiate(new KeyGameObject(), new Vector2(300,400))
        this.instantiate(new ExitGameObject(), new Vector2(650, 160), 0, new Vector2(70, 70))
        this.instantiate(new GateGameObject(), new Vector2(500, 80), Math.PI / 2)

        this.instantiate(new PlayerGameObject(), new Vector2(250, 250))
        this.instantiate(new MessageGameObject(), new Vector2(400, 80))
    }

    createWalls(layout) {
        for (const wall of layout) {
            this.instantiate(new WallGameObject(), wall.position, wall.rotation, wall.scale)
        }
    }
}
