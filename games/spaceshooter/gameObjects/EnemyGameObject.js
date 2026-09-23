class EnemyGameObject extends GameObject {
    constructor() {
        super("Enemy", ["Enemy"])
        this.addComponent(new MovementComponent())
        this.addComponent(new Polygon(), {
            fillStyle: "green", points: Assets.triangle, 
        })
        this.transform.scale = new Vector2(20, 20)
        this.transform.rotation = Math.PI
        this.addComponent(new EnemyController())
        this.addComponent(new Health())
    }
}