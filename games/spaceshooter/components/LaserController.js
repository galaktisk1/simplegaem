class LaserController extends Component {
    speed = 120

    update() {
        const velocity = this.gameObject.getComponent(MovementComponent).velocity
        const speed = this.speed
        const laserpos = this.transform.position
        const laser = this.gameObject
        const shippos = GameObject.find("Player").transform.position
        const enemy = GameObject.find("Enemy")
        const distanceToShip = laserpos.distanceTo(shippos)

        velocity.y = -speed

        if (distanceToShip > 250) {
            laser.destroy()
        }

        // "collision", really a trigger, check
        if (enemy) {
            const enemypos = enemy.transform.position
            const distanceToEnemy = laserpos.distanceTo(enemypos)
            if (distanceToEnemy < 20) {
                laser.destroy()
                // enemy.destroy()
                let health = enemy.getComponent(Health)
                health.currentHealth -= 1
            }
        }
    }
}