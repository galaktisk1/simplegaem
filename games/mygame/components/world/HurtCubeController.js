class HurtCubeController extends Component{
    
    timeSinceHurt
    start(){
        this.timeSinceHurt = 0
    }
    update(){
        const player = GameObject.find("Player")
        if (!player) return
        const playerHealth = player.getComponent(Health)
        const cubepos = this.transform.position
        const playerpos = player.transform.position
        const distanceToCube = cubepos.distanceTo(playerpos)
        
        if (distanceToCube < 25 && this.timeSinceHurt > 60) {
            playerHealth.takeDamage(10)
            GameObject.find("PopUpManager")
                .getComponent(PopUpManager)
                .placePopup("10", player, "red")
            this.timeSinceHurt = 0
        }

        this.timeSinceHurt += Time.deltaTime * 60
    }
}
