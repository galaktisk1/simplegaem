class PlayerPersistence extends Component {
    awake() {
        this.player = this.gameObject
        this.health = this.player.getComponent(Health)
        this.attributes = this.player.getComponent(Attributes)
    }

    start() {
        if (GameSession.playerattributes) {
            this.attributes.load(GameSession.playerattributes)
            this.health.maxHealth = GameSession.playermaxhealth
            this.health.currentHealth = GameSession.playerhealth
        } else {
            this.attributes.rollCharacter()
        }
    }
    
    update() {
        this.save()
    }

    save() {
        GameSession.playerhealth = this.health.currentHealth
        GameSession.playermaxhealth = this.health.maxHealth
        GameSession.playerattributes = this.attributes.save()
    }
}