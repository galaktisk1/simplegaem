class EnemyController extends Component{
    direction = 1
    update() {
        const health = this.gameObject.getComponent(Health)
        const currentHealth = health.currentHealth
        this.transform.position.x += Time.deltaTime * 100 * this.direction
        if(this.transform.position.x > 600) {
            this.direction *= -1
        }
        if(this.transform.position.x < 100) {
            this.direction = 1
        }
        if (currentHealth <= 0) {
            this.gameObject.destroy()
        }
    }
}