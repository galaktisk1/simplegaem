class TurretController extends Component{
    start(){
        
    }
    update(){
        const enemy = GameObject.findGameObjectsWithTag("Enemy")
        if (enemy.length > 0) {
            const e = enemy[0]
            const target = e
            this.transform.lookAt(target.transform.worldPosition)
            if(!this.isFiring){
                this.isFiring = true
                this.startCoroutine(this.fire(target))
            }
        }
    }
    *fire(target){
        const worldPos = this.transform.worldPosition
        const laser = instantiate(new LaserGameObject(), worldPos)
        const movement = laser.getComponent(ProjectileMovementComponent)
        movement.launch(target.transform.worldPosition.minus(worldPos))
        yield new WaitForSeconds(0.5)
        this.isFiring = false
    }
}
