class Health extends Component {
    maxHealth
    currentHealth

    start() {
        this.maxHealth = 100
        this.currentHealth = this.maxHealth
    }

    takeDamage(amount) {
        this.currentHealth -= amount
        if (this.currentHealth <= 0) {
            this.currentHealth = 0
            this.gameObject.markForDestroy = true
        }
    }

    heal(amount) {
        this.currentHealth += amount
        if (this.currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth
        }
    }
}