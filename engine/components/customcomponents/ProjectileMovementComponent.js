// Unreal inspired Projectile Movement
class ProjectileMovementComponent extends MovementComponent {
    initialSpeed = 500
    rotationFollowsVelocity = true

    

    update() {
        super.update()

        if (this.rotationFollowsVelocity && this.velocity.magnitude > 0) {
            this.transform.rotation =
                Math.atan2(this.velocity.y, this.velocity.x)
                + Math.PI / 2
        }
    }
}