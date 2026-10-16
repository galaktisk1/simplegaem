class EnemyController extends Component{
    // TODO: Configure preferred attack distance, damage, and attack cooldown from the enemy definition.
    // TODO: Approach the player in both axes until within the preferred attack distance.
    // TODO: Attack at that distance using the configured cooldown.
    // TODO: Maintain the preferred distance by following or retreating as the player moves.
    speed = 120
    attackDistance = 100
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
        
        
        if (health.currentHealth <= 0) {
            enemy.destroy()
        }
    }
}
