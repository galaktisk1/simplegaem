class HurtCubeController extends Component{
    
    isHurting = false
    update() {
        
    }
    *hurt() {
        const player = GameObject.find("Player")
        const playerHealth = player.getComponent(Health)
        playerHealth.takeDamage(10)
        GameObject.find("PopUpManager")
            .getComponent(PopUpManager)
            .showPopup("10", player, "red")
        yield new WaitForSeconds(1)
        this.isHurting = false
    }
    onCollisionStay(other) {
        const player = GameObject.find("Player")
        if (other !== player) return
        if (this.isHurting) return
        this.isHurting = true
        this.startCoroutine(this.hurt())
    }
}
