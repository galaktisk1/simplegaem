class MainScene extends Scene {
    constructor() {
        super()
        const walls = [{position: new Vector2(0, 0), rotation: 0, scale: new Vector2(10, 1)},
            {position: new Vector2(80, 0), rotation: Math.PI / 2, scale: new Vector2(10, 1)},
            {position: new Vector2(900, 850), rotation: Math.PI, scale: new Vector2(10, 1)},
            {position: new Vector2(900, 0), rotation: Math.PI / 2, scale: new Vector2(10, 1)},
            {position: new Vector2(0, 500), rotation: 0, scale: new Vector2(10, 1)}]
        
            this.instantiate(new BackgroundGameObject())
        
        this.createWalls(walls)
        
        this.instantiate(new KeyGameObject(), new Vector2(300,400))
        this.instantiate(new ExitGameObject(), new Vector2(650, 160))
        this.instantiate(new GateGameObject(), new Vector2(500, 300), Math.PI / 2, new Vector2(5, 1))

        this.player = this.instantiate(new PlayerGameObject(), new Vector2(250, 250))
        this.message = this.instantiate(new MessageGameObject(), new Vector2(400, 80))
    }

    createWalls(layout){
        for (const wall of layout) {
            this.instantiate(new WallGameObject(), wall.position, wall.rotation, wall.scale)
        }
    }
}


// this.instantiate(new WallGameObject(), new Vector2(0, 0), 0, new Vector2(10, 1))
//         this.instantiate(new WallGameObject(), new Vector2(80, 0), Math.PI / 2, new Vector2(10, 1))
//         this.instantiate(new WallGameObject(), new Vector2(900, 850), Math.PI, new Vector2(10, 1))
//         this.instantiate(new WallGameObject(), new Vector2(900, 0), Math.PI / 2, new Vector2(10, 1))
//         this.instantiate(new WallGameObject(), new Vector2(0, 500), 0, new Vector2(10, 1))