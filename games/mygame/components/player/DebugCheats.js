class DebugCheats extends Component {
    // where debug inputs will live
    start() {
        this.player = this.gameObject
        this.health = this.player.getComponent(Health)
    }
    
    
    update() {
        if(!this.player) return
        
        if (Input.getKeyDown("KeyB")) {
            // die button
            this.health.currentHealth = 0
        }
    }
}