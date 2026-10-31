class EnemyController extends Component{
    // TODO: Configure preferred attack distance, damage, and attack cooldown from the enemy definition.
    // TODO: Approach the player in both axes until within the preferred attack distance.
    // TODO: Attack at that distance using the configured cooldown.
    // TODO: Maintain the preferred distance by following or retreating as the player moves.
    speed = 120
    attackDistance = 135
    isAttacking = false
    start() {
        const definition = this.gameObject.definition
        
        // roll the health value and set it
        const health = this.gameObject.getComponent(Health)
        const healthRange = definition.healthMax - definition.healthMin + 1
        const rolledHealth = GameSession.randomE.nextInt(healthRange) + definition.healthMin
        health.maxHealth = rolledHealth
        const experience = this.gameObject.getComponent(Experience)
        experience.currentExperience = definition.experiencePerHealth * rolledHealth + definition.experienceBase

    }
    update() {
        const definition = this.gameObject.definition
        const enemy = this.gameObject
        const enemypos = this.transform.position

        const movement = enemy.getComponent(MovementComponent)
        const velocity = movement.velocity
        
        velocity.x = 0
        velocity.y = 0

        const player = GameObject.find("Player")
        if (!player) return
        const playerpos = player.transform.position
        this.transform.lookAt(playerpos)
        
        
        const directionToPlayer = playerpos.minus(enemypos)
        const distanceToPlayer = directionToPlayer.magnitude
        if (distanceToPlayer > this.attackDistance && Time.deltaTime > 0) {
            movement.moveTowards(playerpos, definition.movementSpeed)
        }
        if (distanceToPlayer <= this.attackDistance && !this.isAttacking) {
            this.isAttacking = true
            this.startCoroutine(this.attack(player))
        }
        
        const health = enemy.getComponent(Health)
        if (health.currentHealth <= 0) {
            // give the player experience held, then destroy, plus other on death actions
            const experienceToGive = this.gameObject.getComponent(Experience).currentExperience
            player.getComponent(Experience).addExperience(experienceToGive)
            // go will destroy through the Health component getting down to 0 health
        }
    }

    onMouseOver() {
        if (!Input.mouseButtonsDownThisFrame.includes(0) || this.gameObject.markForDestroy) return
        const msgmanager = GameObject.find("MessageManager").getComponent(MessageManager)
        msgmanager.showMessage(`You see a ${this.gameObject.definition.name}`, 3)
    }

    *attack(target) {
        const definition = this.gameObject.definition
        // safe from attacking a destroyed or non-existent target
        if(!target || target.markForDestroy) {
            this.isAttacking = false
            return
        }
        // debug
        console.log(definition.name + " attacks", target.name)
        
        
        const damageRange = definition.damageMax - definition.damageMin + 1
        const damageRoll = GameSession.randomE.nextInt(damageRange) + definition.damageMin
        const health = target.getComponent(Health)
        health.takeDamage(damageRoll, this.gameObject)
        const popUpManager = GameObject.find("PopUpManager").getComponent(PopUpManager)
        popUpManager.showPopup(damageRoll, target, "red")
        yield new WaitForSeconds(1)
        this.isAttacking = false
    }
}
