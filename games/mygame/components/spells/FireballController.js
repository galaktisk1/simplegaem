class FireballController extends Component {
    lifetime = 1
    start() {
        this.startCoroutine(this.destroyAfterDelay())
    }
    update() {
        const spell = this.gameObject
        const spellPos = spell.transform.position

        const enemy = GameObject.findGameObjectsWithTag("Enemy")
        if (enemy.length > 0) {
            for (const e of enemy) {
                const enemypos = e.transform.position
                const distanceToEnemy = Vector2.distance(spellPos, enemypos)
                if (distanceToEnemy <= 20) {
                    let health = e.getComponent(Health)
                    let damage = 1
                    health.takeDamage(damage)
                    const popupManager = GameObject.find("PopUpManager")
                        .getComponent(PopUpManager)
                    popupManager.showPopup(damage, e, "red")
                    spell.destroy()
                    return
                }
            }
        }
    }
    *destroyAfterDelay() {
        yield new WaitForSeconds(this.lifetime)
        this.gameObject.destroy()
    }
}