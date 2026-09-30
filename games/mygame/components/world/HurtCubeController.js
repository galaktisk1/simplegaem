class HurtCubeController extends Component{
    
    timeSinceHurt
    start(){
        this.timeSinceHurt = 0
    }
    update(){
        const player = GameObject.find("Player")
        const playerHealth = player.getComponent(Health)
        const cubepos = this.transform.position
        const playerpos = player.transform.position
        const msgmanager = GameObject.find("MessageManager")
            .getComponent(MessageManager)

        const distanceToCube = cubepos.distanceTo(playerpos)
        
        if (distanceToCube < 25 && this.timeSinceHurt > 60) {
            playerHealth.takeDamage(10)
            msgmanager.showMessage(`You were hurt by the cube!`, 3)
            GameObject.find("PopUpManager")
                .broadcastMessage("placePopup", ["10", playerpos, "red"])
            this.timeSinceHurt = 0
        }

        this.timeSinceHurt += Time.deltaTime * 60
    }
}
