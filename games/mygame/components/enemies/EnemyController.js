class EnemyController extends Component{
    // TODO: Configure preferred attack distance, damage, and attack cooldown from the enemy definition.
    // TODO: Approach the player in both axes until within the preferred attack distance.
    // TODO: Attack at that distance using the configured cooldown.
    // TODO: Maintain the preferred distance by following or retreating as the player moves.
    speed = 120
    attackDistance = 135
    isAttacking = false
    start() {
        this.definition = this.gameObject.definition
        this.enemy = this.gameObject
        this.movement = this.gameObject.getComponent(MovementComponent)
        this.health = this.gameObject.getComponent(Health)
        this.experience = this.gameObject.getComponent(Experience)
        this.msgmanager = GameObject.find("MessageManager").getComponent(MessageManager)
        this.popupmanager = GameObject.find("PopUpManager").getComponent(PopUpManager)
        this.player = GameObject.find("Player")
        // roll the health value and set it
        const health = this.gameObject.getComponent(Health)
        const healthRange = this.definition.healthMax - this.definition.healthMin + 1
        const rolledHealth = GameSession.randomE.nextInt(healthRange) + this.definition.healthMin
        health.maxHealth = rolledHealth
        const experience = this.gameObject.getComponent(Experience)
        experience.currentExperience = this.definition.experiencePerHealth * rolledHealth + this.definition.experienceBase

    }
    fixedUpdate() {
        const velocity = this.movement.velocity
        velocity.x = 0
        velocity.y = 0
        const enemypos = this.enemy.transform.position
        if (!this.player) return
        const playerpos = this.player.transform.position
        const directionToPlayer = playerpos.minus(enemypos)
        const distanceToPlayer = directionToPlayer.magnitude
        if (distanceToPlayer > this.attackDistance && Time.deltaTime > 0) {
            this.movement.moveTowards(playerpos, this.definition.movementSpeed)
        }
    }
    update() {
        const enemypos = this.enemy.transform.position
        const velocity = this.movement.velocity
        
        
        if (!this.player) return
        const playerpos = this.player.transform.position
        this.enemy.transform.lookAt(playerpos)
        
        const directionToPlayer = playerpos.minus(enemypos)
        const distanceToPlayer = directionToPlayer.magnitude
        
        if (distanceToPlayer <= this.attackDistance && !this.isAttacking) {
            this.isAttacking = true
            this.startCoroutine(this.attack(this.player))
        }
    }

    onDestroy() {
        if (this.health.currentHealth > 0) return
        const drops = Loot.roll(this.definition.loot)
        if (drops.length === 0) return
        instantiate(new ItemBagGameObject(drops), this.transform.position.clone())
    }

    onMouseOver() {
        if (!Input.mouseButtonsDownThisFrame.includes(0) || this.gameObject.markForDestroy) return
        const msgmanager = GameObject.find("MessageManager").getComponent(MessageManager)
        msgmanager.showMessage(`You see a ${this.gameObject.definition.name}`, 3)
    }

    *attack(target) {
        // safe from attacking a destroyed or non-existent target
        if(!target || target.markForDestroy) {
            this.isAttacking = false
            return
        }
        // debug
        console.log(this.definition.name + " attacks", target.name)
        
        
        const damageRange = this.definition.damageMax - this.definition.damageMin + 1
        const damageRoll = GameSession.randomE.nextInt(damageRange) + this.definition.damageMin
        const health = target.getComponent(Health)
        health.takeDamage(damageRoll, this.gameObject)
        this.popupmanager.showPopup(damageRoll, target, "red")
        yield new WaitForSeconds(1)
        this.isAttacking = false
    }
}
