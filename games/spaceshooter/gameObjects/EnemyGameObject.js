class EnemyGameObject extends GameObject {
    constructor() {
        super("Enemy")
        this.addComponent(new Polygon(), {
            fillstyle: "green", points: Assets.triangle, 
        })
        this.addComponent(new EnemyController())
        
    }
}