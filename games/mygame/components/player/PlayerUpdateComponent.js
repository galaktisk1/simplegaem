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
        const player = this.gameObject
        // health and inv global set up
        player.getComponent(Health).currentHealth = GameSession.playerhealth
        player.getComponent(Inventory).inventory = GameSession.playerinventory
        const lantern = instantiate(new LanternGameObject(), Vector2.left.scaled(62))
        lantern.transform.setParent(player.transform)

        const light = instantiate(new LightingGameObject(), Vector2.zero)
        light.transform.setParent(player.transform)
        
        const facingIndicator = instantiate(new FacingIndicatorGameObject(), Vector2.up.scaled(90))
        facingIndicator.transform.setParent(player.transform)
    }

    update() {
        const movement = this.gameObject.getComponent(MovementComponent)
        const velocity = movement.velocity
        velocity.x = 0
        velocity.y = 0

        const msgmanager = GameObject.find("MessageManager")
                .getComponent(MessageManager)
        
        if (Input.getKey("ArrowUp") || Input.getKey("KeyW")) {
            velocity.y -= this.speed
        }
        if (Input.getKey("ArrowDown") || Input.getKey("KeyS")) {
            velocity.y += this.speed
        }
        if (Input.getKey("ArrowLeft") || Input.getKey("KeyA")) {
            velocity.x -= this.speed
        }
        if (Input.getKey("ArrowRight") || Input.getKey("KeyD")) {
            velocity.x += this.speed
        }

        // clamp velocity to max speed
        movement.velocity = Vector2.clampMagnitude(velocity, this.speed)
        
        if (Input.keysDownThisFrame.includes("Space")) {
            // interact button pressed
        }
        
        // Show inventory once per key press.
        if (Input.getKeyDown("KeyI")) {
            const inventory = GameObject.find("Player").getComponent(Inventory).inventory
            for (const item of inventory) {
                msgmanager.showMessage(`${item.itemDef.name} x${item.amount}`, 3)
            }
        }
        
        const mouseWorldPos = SceneManager.currentScene.mouseWorldPosition
        // rotate player to face mouse
        if (mouseWorldPos) {
            this.transform.lookAt(mouseWorldPos)
            // left click actions
            if (Input.getMouseButtonDown(0)) {
                const fireball = instantiate(new FireballGameObject(), this.transform.position.clone())
                fireball.launch(this.transform.up)
                }
        }
        const player = this.gameObject
        // test smooth damp by applying it to the camera position
        const cameraVelocity = Vector2.zero
        const cameraSmoothTime = 0.3
        
        Camera.main.gameObject.transform.position = Vector2.smoothDamp(
            Camera.main.gameObject.transform.position,
            player.transform.position,
            cameraVelocity,
            cameraSmoothTime,
            Infinity,
            Time.deltaTime
        )
    }

    onDestroy() {
        const player = this.gameObject
        const healthComp = player.getComponent(Health)
        const msgmanager = GameObject.find("MessageManager")
            .getComponent(MessageManager)
        if (healthComp.currentHealth <= 0) {
            const message = msgmanager.showMessage(`You have died!`, 6)
            const textLabel = message.gameObject.getComponent(TextLabel)
            textLabel.fillStyle = "red"
            message.gameObject.transform.scale = new Vector2(5, 5)
        }
    }   
}
