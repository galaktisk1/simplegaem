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
    speed = 4 * 60
    allowedInputs = []
    cameraVelocity = Vector2.zero

    start() {
        // declare components and references ill need later
        this.player = this.gameObject
        this.movement = this.gameObject.getComponent(MovementComponent)
        this.movementVelocity = this.movement.velocity
        this.msgmanager = GameObject.find("MessageManager").getComponent(MessageManager)
        this.health = this.gameObject.getComponent(Health)
        this.inventory = this.gameObject.getComponent(Inventory)

        // health and inv global set up
        this.health.currentHealth = GameSession.playerhealth
        this.inventory.inventory = GameSession.playerinventory

        // game objects attached to the player
        const lantern = instantiate(new LanternGameObject(), Vector2.left.scaled(62))
        lantern.transform.setParent(this.player.transform)

        const light = instantiate(new LightingGameObject(), Vector2.zero)
        light.transform.setParent(this.player.transform)

        const facingIndicator = instantiate(new FacingIndicatorGameObject(), Vector2.up.scaled(90))
        facingIndicator.transform.setParent(this.player.transform)

        Camera.main.transform.position = this.player.transform.position.clone()
        this.cameraVelocity = Vector2.zero
    }

    fixedUpdate() {
        this.movementVelocity.x = 0
        this.movementVelocity.y = 0
        //regular input section
        if (Input.getKey("ArrowUp") || Input.getKey("KeyW")) {
            this.movementVelocity.y -= this.speed
        }
        if (Input.getKey("ArrowDown") || Input.getKey("KeyS")) {
            this.movementVelocity.y += this.speed
        }
        if (Input.getKey("ArrowLeft") || Input.getKey("KeyA")) {
            this.movementVelocity.x -= this.speed
        }
        if (Input.getKey("ArrowRight") || Input.getKey("KeyD")) {
            this.movementVelocity.x += this.speed
        }

        // clamp velocity to max speed
        this.movement.velocity = Vector2.clampMagnitude(this.movementVelocity, this.speed)
    }

    update() {
        
        // cheat codes :)
        if (Input.getKey("KeyB")) {
            // die button
            this.gameObject.getComponent(Health).currentHealth = 0
        }


        // today is to make the different methods of player interaction,
        // use E to enter inspect mode
        // use F to enter attack mode
        // and more later, T was an idea for "tresspass" for sneak attacks, lockpick,so on
        if (Input.getKey("KeyE")) {
            // make a ui element in the top left that says the mode,

            // alter allowed key inputs based on the current mode
        }
        if (Input.getKey("KeyF")) {
            // follow the same method as above for attack mode
        }
        if (Input.getKey("KeyT")) {
            // follow the same method as above for trespass mode
        }



        

        if (Input.getKeyDown("Space")) {
            // interact button pressed, this is available in any mode
            // its just for like interacting with merchants, keys, itembags, so on

        }

        // // Show inventory once per key press.
        // if (Input.getKeyDown("KeyI")) {
        //     // for now this displays messages
        //     const inventory = GameObject.find("Player").getComponent(Inventory).inventory
        //     for (const item of inventory) {
        //         this.msgmanager.showMessage(`${item.itemDef.name} x${item.amount}`, 3)
        //     }
        //     // however, this should display a UI of the inventory
        // }

        // i wish this wasnt in the scene, but so be it for now
        const mouseWorldPos = SceneManager.currentScene.mouseWorldPosition
        // rotate player to face mouse
        if (mouseWorldPos) {
            this.player.transform.lookAt(mouseWorldPos)
            // left click actions
            if (Input.getMouseButtonDown(0)) {
                const fireball = instantiate(new FireballGameObject(), this.player.transform.position.clone())
                fireball.launch(this.player.transform.up)
            }
        }
        // test smooth damp by applying it to the camera position
        const cameraSmoothTime = 0.2

        Camera.main.gameObject.transform.position = Vector2.smoothDamp(
            Camera.main.gameObject.transform.position,
            this.player.transform.position,
            this.cameraVelocity,
            cameraSmoothTime,
            Infinity,
            Time.deltaTime
        )
    }


    onDestroy() {
        if (this.health.currentHealth <= 0) {
            const message = this.msgmanager.showMessage(`You have died!`, 6)
            const textLabel = message.gameObject.getComponent(TextLabel)
            textLabel.fillStyle = "red"
            message.gameObject.transform.scale = new Vector2(5, 5)

            // this is wrong because i stop all coroutines on gameobject destroy
            // just demonstrating the idea of where i want restarting the game to theoretically happen
            // in reality just when the player doesnt exist
            this.startCoroutine(this.restartGame())
        }
    }

    // very bad coroutine cause itll do nothing due to being wiped on gameobject destroy
    *restartGame() {
        yield new WaitForSeconds(5)
        SceneManager.loadScene(TestRoom)
    }
}
