// https://github.com/afritz1/OpenTESArena/wiki/Movement has a movement example:
    /**
     * dist <- speed
        if backward then dist <- dist / 2
        if pc.swimming and not pc.inBoat then
        if pc.race == ARGONIAN then dist <- dist / 2 else dist <- dist / 4
        endif
        pc.move(<corresponding angle>, dist * speedMod)
        endif
    */
   // im thinking of how i could use this later for more complex movement


class PlayerUpdateComponent extends Component {
    speed= 4 * 60
    
    start() {
        // health and inv global set up
        this.gameObject.getComponent(Health).currentHealth = GameSession.playerhealth
        this.gameObject.getComponent(Inventory).inventory = GameSession.playerinventory
        SceneManager.currentScene.instantiate(new LightingGameObject(), this.transform.position)
    }

    update() {
        const velocity = this.gameObject.getComponent(MovementComponent).velocity
        velocity.x = 0
        velocity.y = 0
        
        if (Input.keysDown.includes("ArrowUp") || Input.keysDown.includes("KeyW")) {
            velocity.y -= this.speed
        }
        if (Input.keysDown.includes("ArrowDown") || Input.keysDown.includes("KeyS")) {
            velocity.y += this.speed
        }
        if (Input.keysDown.includes("ArrowLeft") || Input.keysDown.includes("KeyA")) {
            velocity.x -= this.speed
        }
        if (Input.keysDown.includes("ArrowRight") || Input.keysDown.includes("KeyD")) {
            velocity.x += this.speed
        }
        const player = this.gameObject
        const healthComp = player.getComponent(Health)
        if (healthComp.currentHealth <= 0) {
            const message = SceneManager.currentScene.instantiate(new MessageGameObject())
                .getComponent(MessageComponent)
            message.gameObject.getComponent(TextLabel).fillStyle = "red"
            message.gameObject.transform.scale = new Vector2(5, 5)
            message.showMessage(`You have died!`, 6)
        }
    }
    
}
