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

        const message = GameObject.find("Message")
        const messageComp = message.getComponent(MessageComponent)

        const distanceToCube = cubepos.distanceTo(playerpos)
        
        if (distanceToCube < 25 && this.timeSinceHurt > 60) {
            playerHealth.takeDamage(10)
            messageComp.showMessage(`You were hurt by the cube!`)
            this.timeSinceHurt = 0
        }

        this.timeSinceHurt += Time.deltaTime * 60
    }
}