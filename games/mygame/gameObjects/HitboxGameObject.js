class HitboxGameObject extends GameObject {
    constructor() {
        super("HitboxGameObject", [], "default")
        this.addComponent(new Polygon(), { fillStyle: 'rgba(255, 0, 0, 0.3)', points: Assets.swordArc })
        this.addComponent(new Collider(), { isTrigger: true })
        // no Rigidbody needed, enemies already have one for the trigger to work
        // MELEE: add a HitboxController that, during one swing:
        //  - in onTriggerStay, hits each "Enemy" only once (keep a Set of who was hit)
        //  - rolls damage from the equipped weapon's damageMin and damageMax
        //  - calls takeDamage(roll, player) so experience goes to the player
        //  - destroys itself when the swing time is up
        // MELEE: add the blade as a child that sweeps left to right, or right to left at random
    }
}
