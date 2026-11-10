// general enemy prefab, EnemyController.init(definition) turns it into a specific enemy after it is instantiated
class EnemyGameObject extends GameObject {
    constructor() {
        super("Enemy", ["Enemy"], "characters")
        this.addComponent(new Polygon())
        this.addComponent(new Collider())
        this.addComponent(new Health())
        this.addComponent(new MovementComponent())
        this.addComponent(new EnemyController())
        this.addComponent(new Attributes())
    }
}
