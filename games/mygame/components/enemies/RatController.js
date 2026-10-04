class RatController extends Component{
    direction = 1
    start() {
        const enemy = this.gameObject
        const health = enemy.getComponent(Health)
        health.maxHealth = 2
        health.currentHealth = 2
    }
    update() {
        const enemy = this.gameObject
        const enemypos = this.transform.position

        const velocity = enemy.getComponent(MovementComponent).velocity
        const health = enemy.getComponent(Health)
        velocity.x = 0
        velocity.y = 0
        const speed = 2 * 60

        const player = GameObject.find("Player")
        if (!player) return
        const playerpos = player.transform.position
        const directionToPlayer = playerpos.x - enemypos.x

        // this will later be replaced with more complex behavior
        if (enemypos.x > 25) {
            this.direction = -1
        }
        if (enemypos.x < -25) {
            this.direction = 1
        }

        if (directionToPlayer < 0) {
            this.direction = -1
        } else {
            this.direction = 1
        }
        velocity.x = speed * this.direction
        if (health.currentHealth <= 0) {
            enemy.destroy()
        }
    }
}