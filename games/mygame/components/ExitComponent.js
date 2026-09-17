class ExitComponent extends Component {
    beenDoneExited = false
    update() {
        if(!this.beenDoneExited){
            const player = GameObject.find("Player")
            const exitpos = this.transform.position
            const playerpos = player.transform.position
            const distanceToExit = exitpos.distanceTo(playerpos)
            if (distanceToExit < 60) {
                console.log("exited")
                this.beenDoneExited = true
                GameObject.find("Message").showMessage("You exit the room")
                // here is where what will happen on exit happens
            }
        }
    }
}
