// Unreal inspired Projectile Movement
class ProjectileMovementComponent extends MovementComponent {
    initialSpeed = 500
    rotationFollowsVelocity = true

    launch(direction) {
        this.velocity = direction.normalized.scaled(this.initialSpeed)
    }

    update() {
        if (this.rotationFollowsVelocity && this.velocity.magnitude > 0) {
            this.transform.rotation =
                Math.atan2(this.velocity.y, this.velocity.x)
                + Math.PI / 2
        }
    }
}