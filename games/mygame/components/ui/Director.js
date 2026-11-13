class Director extends Component {
    // manage things that generally need to be constant throughout the game, like restarting when the player is gone
    // this can hold making sure messages are restarted between scenes,
    // or anything else that needs to be consistent throughout the game
    // this could hold spawning enemies within the dungeon
    // essentially, this acts as a global manager for game-wide behaviors
    
    encounterChancePerMinute = 1 // exploring
    encounterChancePerHour = 25 // resting
    spawnMargin = 50
    maxEncounterDistance = 1300


    start() {
        this.restarting = false
        this.player = GameObject.find("Player")
        if (!this.player) return
        this.playerHealth = this.player?.getComponent(Health)
        this.playerController = this.player?.getComponent(PlayerController)
        this.vision = GameObject.find("Vision")?.getComponent(VisionComponent)
    }

    update() {
        GameClock.tick(Time.deltaTime)

        // PLAYER DEATH CHECK
        if ((!this.player || this.player.markForDestroy) && !this.restarting) {
            this.restarting = true
            this.startCoroutine(this.restartGame())
        }

        // everything below assumes the player is alive
        if (!this.player || this.player.markForDestroy) return


        // ENEMY ENCOUNTER SPAWNING

        // is player resting?
        const isResting = this.playerController.action?.encountersHourly
        // check if the action state has the flag encountersHourly
        if (isResting) {
            // handle hourly encounters while resting
            const rolls = isResting ? GameClock.hoursPassed : GameClock.minutesPassed
            const chance = isResting ? this.encounterChancePerHour : this.encounterChancePerMinute
            // if there are any enemies nearby, skip the encounter
            if (EnemyController.anyEnemiesNearby(this.player.transform.position, this.playerController.safeRestDistance)) {
                return
            }
            for (let i = 0; i < rolls; i++) {
                if (GameSession.randomE.nextInt(100) < chance) {
                    this.spawnEncounter()
                }
            }

        }
    }

    spawnEncounter() {
        // get candidates for rooms
        const placed = GameObject.find("DungeonBuilder")
            ?.getComponent(DungeonPopulatorComponent)
            ?.placed
        if (!placed) return
        const candidates = []
        for (const p of placed) {
            const cells = p.room.getFloorCells()
            for (const cell of cells) {
                const position = p.room.cellToWorld(p.origin, cell.position.x, cell.position.y)
                candidates.push(position)
            }
        }
        const playerPosition = this.player.transform.position
        const minDistance = (this.vision?.radius ?? 750) + this.spawnMargin
        const fair = candidates.filter(position => {
            const distance = Vector2.distance(position, playerPosition)
            const blocked = Raycast.isBlocked(playerPosition, position)
            return !blocked && distance > minDistance && distance < (this.maxEncounterDistance ?? 1300)
        })
        if (fair.length == 0) return
        const spot = fair[GameSession.randomE.nextInt(fair.length)]
        const enemy = SceneManager.currentScene.instantiate(new EnemyGameObject(), spot)
        const controller = enemy.getComponent(EnemyController)
        // debug initialize rat for now
        console.log("It's rat time")
        controller.init(EnemyDefinitions.rat)
        
        controller.isAlerted = true
    }

    *restartGame() {
        yield new WaitForSeconds(5)
        // all behavior on restarting the game
        GameSession.playerhealth = undefined
        GameSession.floor = 0
        GameSession.playerattributes = null
        GameSession.playermaxhealth = undefined
        GameClock.totalSeconds = 8 * 60 * 60
        GameClock.speed = 1
        SceneManager.loadScene(CharacterCreator)
    }
}