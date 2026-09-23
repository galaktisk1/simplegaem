class Level02 extends Scene {
    constructor() {
        super()
        this.instantiate(new LevelControllerGameObject())
        // this.instantiate(new MainGameObject(), new Vector2(300, 300))
        this.instantiate(new EnemyGameObject(), new Vector2(300, 100))
        this.instantiate(new EnemyGameObject(), new Vector2(200, 100))
        // this.instantiate(new PointsGameObject(), new Vector2(10, 10))
    }
}