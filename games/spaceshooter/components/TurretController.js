class TurretController extends Component{
    timeSinceShot = 0
    start(){
        
    }
    update(){
        const enemy = GameObject.findGameObjectsWithTag("Enemy")
        if (enemy.length > 0) {
            const e = enemy[0]
            const target = e
            this.transform.lookAt(target.transform.worldPosition)
            // cooldown
            this.timeSinceShot += 1
            if (this.timeSinceShot > 20) {
                this.timeSinceShot = 0
                // get turret world pos
                const worldPos = this.transform.worldPosition
                const laser = instantiate(new LaserGameObject(), worldPos)
                const movement = laser.getComponent(ProjectileMovementComponent)
                movement.launch(target.transform.worldPosition.minus(worldPos))
                
            }
        }
    }
}
