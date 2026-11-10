class EnemyController extends Component {
    // TODO: Configure preferred attack distance, damage, and attack cooldown from the enemy definition.
    // TODO: Approach the player in both axes until within the preferred attack distance.
    // TODO: Attack at that distance using the configured cooldown.
    // TODO: Maintain the preferred distance by following or retreating as the player moves.
    speed
    attackDistance = 135
    sightDistance = 700
    isAttacking = false
    isAlerted = false
    definition = null

    // like Unity's GetComponent<EnemyController>().Init(definition)
    init(definition) {
        this.definition = definition
        const go = this.gameObject
        go.name = definition.name
        go.transform.scale = definition.scale.clone()
        Object.assign(go.getComponent(Polygon), { fillStyle: definition.fillStyle, points: definition.points })

        const a = definition.attributes
        this.speed = a.SPD * 3
        Object.assign(go.getComponent(Attributes), {
            level: definition.level,
            strength: a.STR,
            intelligence: a.INT,
            willpower: a.WIL,
            agility: a.AGI,
            speed: a.SPD,
            endurance: a.END,
            personality: a.PER,
            luck: a.LUC,
        })
    }

    start() {
        // children wait for start, scenes can instantiate enemies in their constructor before they are the current scene
        for (const childDefinition of this.definition.children ?? []) {
            const child = new GameObject(childDefinition.name, [], this.gameObject.layer)
            child.addComponent(new Polygon(), {
                fillStyle: childDefinition.fillStyle,
                points: childDefinition.points.map(point => point.clone()),
            })
            child.transform.setParent(this.transform)
            child.transform.rotation = childDefinition.rotation ?? 0
            instantiate(child, childDefinition.position.clone())
        }

        this.enemy = this.gameObject
        this.movement = this.gameObject.getComponent(MovementComponent)
        this.health = this.gameObject.getComponent(Health)
        this.attributes = this.gameObject.getComponent(Attributes)
        this.msgmanager = GameObject.find("MessageManager").getComponent(MessageManager)
        this.popupmanager = GameObject.find("PopUpManager").getComponent(PopUpManager)
        this.player = GameObject.find("Player")
        // roll the health value and set it
        const health = this.gameObject.getComponent(Health)
        const healthRange = this.definition.healthMax - this.definition.healthMin + 1
        const rolledHealth = GameSession.randomE.nextInt(healthRange) + this.definition.healthMin
        health.maxHealth = rolledHealth
        this.attributes.currentExperience = this.definition.experiencePerHealth * rolledHealth + this.definition.experienceBase

    }
    fixedUpdate() {
        const velocity = this.movement.velocity
        velocity.x = 0
        velocity.y = 0
        const enemypos = this.enemy.transform.position
        if (!this.player || this.player.markForDestroy) return
        const playerpos = this.player.transform.position
        const directionToPlayer = playerpos.minus(enemypos)
        const distanceToPlayer = directionToPlayer.magnitude
        if (!this.isAlerted) return
        if (distanceToPlayer > this.attackDistance && Time.deltaTime > 0) {
            this.movement.moveTowards(playerpos, this.speed)
        }
    }
    update() {
        const enemypos = this.enemy.transform.position
        if (!this.player || this.player.markForDestroy) return
        const playerpos = this.player.transform.position

        const directionToPlayer = playerpos.minus(enemypos)
        const distanceToPlayer = directionToPlayer.magnitude

        const occluders = SceneManager.currentScene.occluders ?? []
        const direction = directionToPlayer.normalized
        const blocked = Raycast.cast(enemypos, direction, occluders, distanceToPlayer) !== null

        const canSee = distanceToPlayer <= this.sightDistance && !blocked
        if (canSee) this.isAlerted = true
        if (!this.isAlerted) {
            this.enemy.transform.rotation = 0
            return
        }
        // if the player is too far, the enemy loses alertness
        if (distanceToPlayer > this.sightDistance * 2) {
            this.isAlerted = false
            return
        }
        this.enemy.transform.lookAt(playerpos)

        if (distanceToPlayer <= this.attackDistance && !blocked && !this.isAttacking) {
            this.isAttacking = true
            this.startCoroutine(this.attack(this.player))
        }
    }

    onDestroy() {
        if (this.health.currentHealth > 0) return
        const drops = Loot.roll(this.definition.loot)
        if (drops.length === 0) return
        instantiate(new ItemBagGameObject(), this.transform.position.clone())
            .getComponent(ItemBagController).init(drops)
    }

    onDamaged() {
        this.isAlerted = true
    }

    onMouseOver() {
        if (!Input.getMouseButtonDown(0) || this.gameObject.markForDestroy) return
        this.msgmanager.showMessage(`You see a ${this.definition.name}`, 3)
    }

    *attack(target) {
        // safe from attacking a destroyed or non-existent target
        if (!target || target.markForDestroy) {
            this.isAttacking = false
            return
        }
        const targetAttributes = target.getComponent(Attributes)
        // debug
        console.log(this.definition.name + " attacks", target.name)

        if (!Combat.rollToHit(this.attributes, targetAttributes)) {
            this.popupmanager.showPopup("Miss", target, "gray")
        } else {
            const damageRange = this.definition.damageMax - this.definition.damageMin + 1
            const damageRoll = GameSession.randomE.nextInt(damageRange) + this.definition.damageMin
            const health = target.getComponent(Health)
            health.takeDamage(damageRoll, this.gameObject, target)
            this.popupmanager.showPopup(damageRoll, target, "red")
        }
        // the cooldown runs whether it hit or missed
        yield new WaitForSeconds(1)
        this.isAttacking = false
    }
}
