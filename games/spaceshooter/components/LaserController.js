class LaserController extends Component {
    speed = 3 * 60

    update() {
        const velocity = this.gameObject.getComponent(MovementComponent).velocity
        const speed = this.speed
        const laserpos = this.transform.position
        const laser = this.gameObject
        const shippos = GameObject.find("Player").transform.position
        const enemy = GameObject.findGameObjectsWithTag("Enemy")
        const distanceToShip = laserpos.distanceTo(shippos)

        velocity.y = -speed

        if (distanceToShip > 250) {
            laser.destroy()
        }

        // "collision", really a trigger, check
        if (enemy.length > 0) {
            for(const e of enemy) {
                const enemypos = e.transform.position
                const distanceToEnemy = laserpos.distanceTo(enemypos)
                if (distanceToEnemy < 20) {
                    laser.destroy()
                    // e.destroy()
                    let health = e.getComponent(Health)
                    health.currentHealth--
                    Globals.points++
                }
            }
        }
    }
}