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
        instantiate(new LightingGameObject(), player.transform.position)
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
        
        if (Input.keysDown.includes("Space")) {
            // interact button pressed
        }
        
        // make it so that the inventory key toggles the inventory display 
        // instead of spamming the message manager with inventory items
        const inventorykey = Input.keysDown.includes("KeyI")
        if (inventorykey && !this.InventoryKeyUsed) {
            this.InventoryKeyUsed = true
            const inventory = GameObject.find("Player").getComponent(Inventory).inventory
            for (const item of inventory) {
                msgmanager.showMessage(`${item.itemDef.name} x${item.amount}`, 3)
            }
        }
        this.InventoryKeyUsed = inventorykey
        
        
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
