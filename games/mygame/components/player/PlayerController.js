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


class PlayerController extends Component {
    baseMoveSpeed = 4 * 60
    /** @type {PlayerAction | null} */
    action = null
    actionTimer = 0
    actionCap = 5

    fatigueLossPerMinute = 0.067 // OpenTESArena tickPlayerStamina

    start() {
        // declare components and references ill need later
        this.player = this.gameObject
        this.movement = this.gameObject.getComponent(MovementComponent)
        this.msgmanager = GameObject.find("MessageManager").getComponent(MessageManager)
        this.health = this.gameObject.getComponent(Health)
        this.attributes = this.gameObject.getComponent(Attributes)
        this.inventory = this.gameObject.getComponent(Inventory)
        this.weapon = { name: "fists", damageMin: 1, damageMax: 2 }
        this.input = this.gameObject.getComponent(PlayerInput)
        this.cameraFollow = Camera.main.gameObject.addComponent(CameraFollow)
        this.cameraFollow.init(this.player)

        // health and inv global set up
        this.inventory.inventory = GameSession.playerinventory

        instantiate(new LanternGameObject(), Vector2.left.scaled(62))

        const facingIndicator = instantiate(new FacingIndicatorGameObject(), Vector2.up.scaled(90))
        facingIndicator.transform.setParent(this.player.transform)

        this.actions = {
            move: new MoveAction(this),
            attack: new AttackAction(this),
            cast: new CastAction(this),
            rest: new RestAction(this),
        }
        this.setAction("move")
    }

    update() {
        if (Time.timeScale === 0) return
        const aimpoint = this.input.aimPoint
        // rotate player to face mouse
        if (aimpoint) {
            this.player.transform.lookAt(aimpoint)
        }
        this.actionTimer += Time.deltaTime
        for (let i = 0; i < this.actionCap && this.action; i++) {
            if (this.action.update() !== true) break
        }

        if (this.action?.drainsFatigue) {
            const fatigueDrain = GameClock.minutesPassed * this.fatigueLossPerMinute
            this.attributes.currentFatigue = Math.max(0, this.attributes.currentFatigue - fatigueDrain)
        }
        
        
        // below is for the action state machine i will be building,
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


        if (this.input.interactPressed) {
            // interact button pressed, this is available in any mode
            // its just for like interacting with merchants, keys, itembags, so on

        }



    }

    // sets the current action for the player, exiting the previous one if necessary
    // this is an action state machine like Super Mario 64 has for mario's separate actions (walking, jumping, attacking, etc.)
    setAction(name, arg) {
        // exit the current action if there is one
        if (this.action) {
            this.action.exit()
        }
        this.actionTimer = 0
        // set the new action based on the name
        // @ts-ignore
        this.action = this.actions[name]
        // if the action exists, call its enter method
        if (this.action) {
            this.action.enter(arg)
        }
        return true
    }

    move(multiplier = 1) {
        const speed = this.baseMoveSpeed * this.attributes.baseSpeed / 30
        this.movement.velocity = this.input.move.scaled(speed * multiplier)
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
            // this.startCoroutine(this.restartGame())
        }
    }

    onLevelUp() {
        const screen = GameObject.find("StatsScreen")
        if (screen) return
        SceneManager.currentScene.instantiate(new StatsScreenGameObject()).getComponent(CharacterCreatorUI).init(
            this.player.getComponent(Attributes),
            this.player.getComponent(Health),
            "levelUp"
        )
    }

    // very bad coroutine cause itll do nothing due to being wiped on gameobject destroy
    *restartGame() {
        yield new WaitForSeconds(1)
        this.health.currentHealth = GameSession.playermaxhealth ?? 100
    }
}
