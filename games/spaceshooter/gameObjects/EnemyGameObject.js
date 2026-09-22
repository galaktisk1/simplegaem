class EnemyGameObject extends GameObject {
    constructor() {
        super("Enemy")
        this.addComponent(new Polygon(), {
            fillStyle: "green", points: Assets.triangle, 
        })
        this.addComponent(new EnemyController())
        this.addComponent(new Health(2))
    }
}