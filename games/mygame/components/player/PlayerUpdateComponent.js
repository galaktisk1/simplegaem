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
        const lantern = instantiate(new LanternGameObject(), new Vector2(-62, 0))
        lantern.transform.setParent(player.transform)

        const light = instantiate(new LightingGameObject(), new Vector2(0, 0))
        light.transform.setParent(player.transform)
        
        const facingIndicator = instantiate(new FacingIndicatorGameObject(), new Vector2(0, -90))
        facingIndicator.transform.setParent(player.transform)
    }

    update() {
        const velocity = this.gameObject.getComponent(MovementComponent).velocity
        velocity.x = 0
        velocity.y = 0

        const msgmanager = GameObject.find("MessageManager")
                .getComponent(MessageManager)
        
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
        
        if (Input.keysDownThisFrame.includes("Space")) {
            // interact button pressed
        }
        
        // Show inventory once per key press.
        if (Input.keysDownThisFrame.includes("KeyI")) {
            const inventory = GameObject.find("Player").getComponent(Inventory).inventory
            for (const item of inventory) {
                msgmanager.showMessage(`${item.itemDef.name} x${item.amount}`, 3)
            }
        }
        
        // testing mouse stuff
        const canvasRect = Engine.canvas.getBoundingClientRect()
        const mousePos = Input.mousePosition
        
        
        // rotate player to face mouse
        if (mousePos) {
            const centeredX = mousePos.x - canvasRect.left - canvasRect.width / 2
            const centeredY = mousePos.y - canvasRect.top - canvasRect.height / 2
            const cameraPos = Camera.main.gameObject.transform.position
            const mouseWorldPos = new Vector2(centeredX + cameraPos.x, centeredY + cameraPos.y)
            
            this.transform.lookAt(mouseWorldPos)
            
            
            
            
            // left click actions
            if (Input.mouseButtonsDownThisFrame.includes(0)) {
            console.log(`Mouse clicked at world position: x=${mouseWorldPos.x}, y=${mouseWorldPos.y}`)
            
            // now check if the mouse is close to the enemy world position
            const enemies = GameObject.findGameObjectsWithTag("Enemy")
            for (const enemy of enemies) {
                const enemyPos = enemy.transform.position
                const distanceToMouse = Vector2.distance(mouseWorldPos, enemyPos)
                if (distanceToMouse < 50) { // arbitrary proximity threshold
                    console.log(`Mouse is close to enemy at x=${enemyPos.x}, y=${enemyPos.y}`)
                    msgmanager.showMessage(`You see a ${enemy.definition.name}`, 3)
                    }
            }

            const fireball = instantiate(new FireballGameObject(), this.transform.position.clone())
            fireball.launch(this.transform.up)
        }
        }

        
        
        
        const player = this.gameObject
        const healthComp = player.getComponent(Health)
        
        if (healthComp.currentHealth <= 0) {
            const message = msgmanager.showMessage(`You have died!`, 6)
            const textLabel = message.gameObject.getComponent(TextLabel)
            textLabel.fillStyle = "red"
            message.gameObject.transform.scale = new Vector2(5, 5)
        }
        Camera.main.gameObject.transform.position = player.transform.position.clone()
    }
    
}
