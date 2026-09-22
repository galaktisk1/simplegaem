class Health extends Component {
    maxHealth = 100
    currentHealth = 100

    constructor(maxHealth) {
        super()
        this.maxHealth = maxHealth
        this.currentHealth = this.maxHealth
    }

    takeDamage(amount) {
        const go = this.gameObject
        this.currentHealth -= amount
        if (this.currentHealth <= 0) {
            this.currentHealth = 0
            go.destroy()
        }
    }

    heal(amount) {
        this.currentHealth += amount
        if (this.currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth
        }
    }
}