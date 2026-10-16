class FireballController extends Component{
    lifetime = 3
    start(){
            
    }
    update(){
        const spell = this.gameObject
        this.lifetime -= Time.deltaTime
        if (this.lifetime <= 0) {
            spell.destroy()
            return
        }
        const spellPos = spell.transform.position

        const enemy = GameObject.findGameObjectsWithTag("Enemy")
        if (enemy.length > 0) {
            for (const e of enemy) {
                const enemypos = e.transform.position
                const distanceToEnemy = spellPos.distanceTo(enemypos)
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
}