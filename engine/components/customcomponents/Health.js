class Health extends Component {
    _maxHealth = 100
    _currentHealth = 100

    constructor() {
        super()
        this._currentHealth = this._maxHealth
    }

    set maxHealth(amount) {
        this._maxHealth = amount
        this._currentHealth = amount
    }
    get maxHealth() {
        return this._maxHealth
    }

    get currentHealth() {
        return this._currentHealth
    }
    set currentHealth(amount) {
        this._currentHealth = Math.min(amount, this._maxHealth)
        if (this._currentHealth < 0) this._currentHealth = 0
    }

    takeDamage(amount, attacker = GameObject, target = GameObject) {
        const go = this.gameObject
        this._currentHealth -= amount
        if (this._currentHealth <= 0) {
            this._currentHealth = 0
            if (go.getComponent(Experience) == true) {
                if (attacker && attacker.getComponent(Experience)) {
                    const attExperience = attacker.getComponent(Experience)
                    const tarExperience = go.getComponent(Experience)
                    attExperience.addExperience(tarExperience.currentExperience)
                } else {
                    const experienceToGive = go.getComponent(Experience).currentExperience
                    // by default, find the player and give the experience
                    const player = GameObject.find("Player")
                    if (player) {
                        player.getComponent(Experience).addExperience(experienceToGive)
                    }
                }
            }
            go.destroy()
        }
    }

    heal(amount) {
        this._currentHealth += amount
        if (this._currentHealth > this._maxHealth) {
            this._currentHealth = this._maxHealth
        }
    }
}