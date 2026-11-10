class Attributes extends Component {
    currentExperience = 0
    bonusPoints = 0
    /** @type {{ experienceStart: number, healthDie: number, baseAttributes: { STR: number, INT: number, WIL: number, AGI: number, SPD: number, END: number, PER: number, LUC: number } } | null} */
    characterClass = null
    // all attributes are initialized to 50 by default
    // OpenTESArena src/Stats/PrimaryAttribute.h
    strength = 50
    intelligence = 50
    willpower = 50
    agility = 50
    speed = 50
    endurance = 50
    personality = 50
    luck = 50

    level = 1
    levelsXp = [] // array to store experience required for each level

    static NAMES = ["strength", "intelligence", "willpower", "agility", "speed", "endurance", "personality", "luck"]

    awake() {
        if (this.characterClass) {
            let xp = this.characterClass.experienceStart
            this.levelsXp = [xp]
            for (let level = 3; level <= 20; level++) {
                xp = Math.floor(xp * (level <= 9 ? 1.875 : 1.5))
                this.levelsXp.push(xp)
            }
        }
    }

    rollCharacter() {
        if (!this.characterClass) return

        const base = this.characterClass.baseAttributes
        this.strength = base.STR + 1 + GameSession.randomE.nextInt(20)
        this.intelligence = base.INT + 1 + GameSession.randomE.nextInt(20)
        this.willpower = base.WIL + 1 + GameSession.randomE.nextInt(20)
        this.agility = base.AGI + 1 + GameSession.randomE.nextInt(20)
        this.speed = base.SPD + 1 + GameSession.randomE.nextInt(20)
        this.endurance = base.END + 1 + GameSession.randomE.nextInt(20)
        this.personality = base.PER + 1 + GameSession.randomE.nextInt(20)
        this.luck = base.LUC + 1 + GameSession.randomE.nextInt(20)

        for (let die = 0; die < 4; die++) {
            this.bonusPoints += 1 + GameSession.randomE.nextInt(6)
        }

        const health = this.gameObject.getComponent(Health)
        if (health) {
            health.maxHealth = 25 + 1 + GameSession.randomE.nextInt(this.characterClass.healthDie) + this.bonusToHealth
        }
    }

    // returns a plain object containing the current state of this component
    save() {
        const data = {
            level: this.level,
            currentExperience: this.currentExperience,
            bonusPoints: this.bonusPoints
        }
        for (const name of Attributes.NAMES) {
            data[name] = this[name]
        }
        return data
    }

    // loads the state of this component from a plain object
    // this is just Object.assign(this, data), the same thing addComponent does.
    load(data) {
        Object.assign(this, data)
    }


    // adds experience and handles leveling up
    addExperience(amount) {
        this.currentExperience += amount
        this.levelUp()
    }

    levelUp() {
        // you need a class to level
        if (!this.characterClass) return
        // remember starting level to check if we leveled up
        const startLevel = this.level
        while (this.level <= this.levelsXp.length && this.currentExperience >= this.levelsXp[this.level - 1]) {
            this.level++
            this.bonusPoints += 3 + GameSession.randomE.nextInt(4)

            const health = this.gameObject.getComponent(Health)
            if (health) {
                health.maxHealth += 1 + GameSession.randomE.nextInt(this.characterClass.healthDie) + this.bonusToHealth
            }
        }
        if (this.level > startLevel) {
            this.gameObject.broadcastMessage("onLevelUp", [])
        }
    }

    // on death/destruction of the owner of this component, give experience to the target
    giveExperience(target) {
        const experienceComponent = target.getComponent(Attributes)
        if (experienceComponent) {
            experienceComponent.addExperience(this.currentExperience)
        }
    }
    // if something caused this target to lose experience, remove it from the current experience, but do not affect the level or experience to next level
    removeExperience(amount) {
        this.currentExperience -= amount
        if (this.currentExperience < 0) this.currentExperience = 0
    }

    // all below comes from OpenTESArena src/Stats/ArenaStatUtils.h and src/Player/ArenaPlayerUtils.h

    static scale100To256(value) {
        return Math.floor(value * 256 / 100)
    }

    static scale256To100(value) {
        return Math.round(value * 100 / 256)
    }

    get bonusToHit() {
        if (this.agility <= 45) return -1
        return Math.trunc((this.agility - 50) / 5)
    }

    get bonusToDefend() {
        return this.bonusToHit
    }

    get bonusDamage() {
        if (this.strength <= 43) return 0
        return Math.trunc((this.strength - 48) / 5)
    }
    get bonusToHealth() {
        if (this.endurance <= 50) return 0
        const value = Attributes.scale100To256(this.endurance)
        return Attributes.scale256To100(Math.trunc((value - 128 + 12) / 25))
    }

    get attackBonus() {
        return Attributes.scale100To256(this.agility) - 128
    }

    get luckBonus() {
        return Math.trunc((Attributes.scale100To256(this.luck) - 116) / 25) * 2
    }
}