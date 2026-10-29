class TurretGameObject extends GameObject{
    constructor(){
        super("TurretGameObject", [], "ships")
        this.addComponent(new Polygon(), {fillStyle: 'magenta', points: Assets.triangle})
        this.addComponent(new TurretController)
        this.transform.scale = new Vector2(0.3,0.3)
    }
}
