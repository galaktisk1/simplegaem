class HitboxGameObject extends GameObject {
    constructor() {
        super("HitboxGameObject", [], "default")
        this.addComponent(new Polygon(), { fillStyle: 'rgba(255, 0, 0, 0.3)', points: Assets.swordArc })
        this.addComponent(new Collider(), { isTrigger: true })
        //this.addComponent(new RigidBody())
        //this.addComponent(new HitboxController)
        //this.transform.scale = new Vector2(1,1)
    }
}
