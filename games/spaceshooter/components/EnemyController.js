class EnemyController extends Component{
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
        const speed = 2 *60


        if(enemypos.x > 600) {
            this.direction = -1
        }
        if(enemypos.x < 100) {
            this.direction = 1
        }
        velocity.x = speed * this.direction
        if (health.currentHealth <= 0) {
            enemy.destroy()
        }
    }
}
