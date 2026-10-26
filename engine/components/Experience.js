class Experience extends Component { 
    currentExperience = 0
    experienceToNextLevel = 100
    level = 1
    // adds experience and handles leveling up
    addExperience(amount) {
        this.currentExperience += amount
        while (this.currentExperience >= this.experienceToNextLevel) {
            this.currentExperience -= this.experienceToNextLevel
            this.experienceToNextLevel = Math.floor(this.experienceToNextLevel * 1.5)
            this.level++
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