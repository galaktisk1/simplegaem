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

    update() {
        // this is for the cheat code of dying instantly
        if (this._currentHealth <= 0) {
            const go = this.gameObject
            go.destroy()
        }
    }

    takeDamage(amount, attacker, target) {
        const go = this.gameObject
        if (go.markForDestroy) return
        this._currentHealth -= amount
        go.sendMessage("onDamaged", [amount, attacker, target])
        if (this._currentHealth <= 0) {
            this._currentHealth = 0
            if (go.getComponent(Attributes)) {
                if (attacker && attacker.getComponent(Attributes)) {
                    const attAttributes = attacker.getComponent(Attributes)
                    const tarAttributes = go.getComponent(Attributes)
                    attAttributes.addExperience(tarAttributes.currentExperience)
                } else {
                    const experienceToGive = go.getComponent(Attributes).currentExperience
                    // by default, find the player and give the experience
                    const player = GameObject.find("Player")
                    if (player) {
                        player.getComponent(Attributes).addExperience(experienceToGive)
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