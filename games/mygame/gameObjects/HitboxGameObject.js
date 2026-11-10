// sword swing prefab, HitboxController.init(attacker, weapon) says who swung it and with what
class HitboxGameObject extends GameObject {
    constructor() {
        // spells layer for now
        super("HitboxGameObject", [], "spells")
        this.addComponent(new Polygon(), { fillStyle: 'rgba(255, 0, 0, 0.3)', points: Assets.swordArc })
        this.addComponent(new Collider(), { isTrigger: true })
        this.addComponent(new HitboxController())
    }
}
