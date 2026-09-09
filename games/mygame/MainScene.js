class MainScene extends Scene {
    constructor() {
        super()
        this.instantiate(new BackgroundGameObject())
        this.instantiate(new WallGameObject(new Vector2(0, 0), 0, new Vector2(10, 1)))
        this.instantiate(new WallGameObject(new Vector2(80, 0), Math.PI / 2, new Vector2(10, 1)))
        this.instantiate(new WallGameObject(new Vector2(900, 850), Math.PI, new Vector2(10, 1)))
        this.instantiate(new WallGameObject(new Vector2(900, 0), Math.PI / 2, new Vector2(10, 1)))
        // https://javascript.info/object-copy
        // this is a reference to the player game object, Scene.js now returns the game object, so I can access it like this.player.position
        this.player = this.instantiate(new PlayerGameObject())
        this.instantiate(new LightingGameObject(this.player))
    }
}