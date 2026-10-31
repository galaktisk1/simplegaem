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
        const enemy = this.gameObject
        const enemypos = this.transform.position

        const velocity = enemy.getComponent(MovementComponent).velocity
        const health = enemy.getComponent(Health)
        velocity.x = 0
        velocity.y = 0

        const player = GameObject.find("Player")
        if (!player) return
        const playerpos = player.transform.position
        const directionToPlayer = playerpos.minus(enemypos)
        const distanceToPlayer = directionToPlayer.magnitude
        this.transform.lookAt(playerpos)

        if (distanceToPlayer > this.attackDistance) {
            velocity.x = directionToPlayer.x / distanceToPlayer * this.speed
            velocity.y = directionToPlayer.y / distanceToPlayer * this.speed
        }
        if (distanceToPlayer <= this.attackDistance && !this.isAttacking) {
            this.isAttacking = true
            this.startCoroutine(this.attack(player))
        }

        if (health.currentHealth <= 0) {
            // give the player experience held, then destroy, plus other on death actions
            const experienceToGive = this.gameObject.getComponent(Experience).currentExperience
            player.getComponent(Experience).addExperience(experienceToGive)
            // go will destroy through the Health component getting down to 0 health
            Component.destroy(this)
        }
    }

    onMouseOver() {
        if (!Input.mouseButtonsDownThisFrame.includes(0) || this.gameObject.markForDestroy) return
        const msgmanager = GameObject.find("MessageManager").getComponent(MessageManager)
        msgmanager.showMessage(`You see a ${this.gameObject.definition.name}`, 3)
    }

    *attack(target) {
        console.log(this.gameObject.definition.name + " attacks", target.name)
        yield new WaitForSeconds(1)
        this.isAttacking = false
    }
}
