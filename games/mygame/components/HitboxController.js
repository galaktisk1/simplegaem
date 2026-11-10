class HitboxController extends Component {
    swingTime = 0.25
    // enemies already hit this swing, so each is only hit once
    hit = new Set()
    attacker = null
    weapon = null

    init(attacker, weapon) {
        this.attacker = attacker
        this.weapon = weapon
    }

    start() {
        this.popUpManager = GameObject.find("PopUpManager").getComponent(PopUpManager)
        this.startCoroutine(this.destroyAfterSwing())

    }

    *destroyAfterSwing() {
        yield new WaitForSeconds(this.swingTime)
        this.gameObject.destroy()
    }

    onTriggerStay(other) {
        if (!other.tags.includes("Enemy") || this.hit.has(other)) {
            return
        }
        this.hit.add(other)
        
        const attackerAttributes = this.attacker.getComponent(Attributes)
        const defenderAttributes = other.getComponent(Attributes)
        if (!Combat.rollToHit(attackerAttributes, defenderAttributes)) {
            this.popUpManager.showPopup("Miss", other, "grey")
            return
        }
        
        const damageMin = this.weapon.damageMin
        const damageMax = this.weapon.damageMax
        
        const roll = this.weapon.damageMin
            + GameSession.randomE.nextInt(damageMax - damageMin + 1)
            + attackerAttributes.bonusDamage
        
        const health = other.getComponent(Health)
        if (health) {
            health.takeDamage(roll, this.attacker)
            this.popUpManager.showPopup(roll, other)
        }
    }
}