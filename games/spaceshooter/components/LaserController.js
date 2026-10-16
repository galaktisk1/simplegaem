class LaserController extends Component {
    speed = 3 * 60

    update() {
        const velocity = this.gameObject.getComponent(MovementComponent).velocity
        const speed = this.speed
        const laserpos = this.transform.position
        const laser = this.gameObject
        const shippos = GameObject.find("Player").transform.position
        const enemy = GameObject.findGameObjectsWithTag("Enemy")
        const distanceToShip = Vector2.distance(laserpos, shippos)

        velocity.y = -speed

        if (distanceToShip > 250) {
            laser.destroy()
        }

        // "collision", really a trigger, check
        if (enemy.length > 0) {
            for(const e of enemy) {
                const enemypos = e.transform.position
                const distanceToEnemy = Vector2.distance(laserpos, enemypos)
                if (distanceToEnemy < 20) {
                    laser.destroy()
                    // e.destroy()
                    let health = e.getComponent(Health)
                    health.currentHealth--
                    //Globals.points++
                    let gameObjects = GameObject.findGameObjectsByType(Transform)
                    for (const go of gameObjects) {
                        go.broadcastMessage("updatePoints", [1])
                    }
                }
            }
        }
    }
}