class FireballGameObject extends GameObject{
    constructor(){
        super("FireballGameObject", [], "spells")
        this.addComponent(new Circle(), {fillStyle: "red", radius: Assets.circle.radius})
        this.addComponent(new ProjectileMovementComponent())
        this.addComponent(new FireballController())
        this.transform.scale = new Vector2(15, 15)
    }
    launch(direction){
        const movement = this.getComponent(ProjectileMovementComponent)
        if (!movement) return
        const length = direction.magnitude
        if (length === 0) return

        movement.velocity = new Vector2(
            direction.x / length * movement.initialSpeed,
            direction.y / length * movement.initialSpeed
        )
    }
}