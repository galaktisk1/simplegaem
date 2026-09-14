class ExitComponent extends Component {
    beenDoneExited = false
    update() {
        if(!this.beenDoneExited){
            const player = this.player
            const exitpos = this.transform.position
            const playerpos = player.transform.position
            const distanceToExit = exitpos.distanceTo(playerpos)
            if (distanceToExit < 60) {
                console.log("exited")
                this.beenDoneExited = true
                Engine.currentScene.message.showMessage("You exit the room")
                // here is where what will happen on exit happens
            }
        }
    }
}