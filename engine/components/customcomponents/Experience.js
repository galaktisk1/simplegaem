class Experience extends Component { 
    currentExperience = 0
    totalExperience = 0
    level = {
        levelsXp: [], // array to store experience required for each level
        current: 1,
        total: this.currentExperience
    }
    // adds experience and handles leveling up
    addExperience(amount) {
        this.currentExperience += amount
        while (this.currentExperience >= this.level.levelsXp[this.level.current - 1]) {
            this.levelUp()
        }
    }

    levelUp() {
        if (this.level.current < this.level.levelsXp.length) {
            this.currentExperience -= this.level.levelsXp[this.level.current - 1]
            this.totalExperience += this.level.levelsXp[this.level.current - 1]
            this.level.current++
        }
    }

    // on death/destruction of the owner of this component, give experience to the target
    giveExperience(target) {
        const experienceComponent = target.getComponent(Experience)
        if (experienceComponent) {
            experienceComponent.addExperience(this.currentExperience)
        }
    }
    // if something caused this target to lose experience, remove it from the current experience, but do not affect the level or experience to next level
    removeExperience(amount) {
        this.currentExperience -= amount
        if (this.currentExperience < 0) this.currentExperience = 0
    }
}