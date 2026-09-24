class ExitComponent extends Component {
    beenDoneExited = false

    update() {
        if (!this.beenDoneExited) {

        const player = GameObject.find("Player")
        const message = GameObject.find("Message")
        const messageComp = message.getComponent(MessageComponent)
        const exitpos = this.transform.position
        const playerpos = player.transform.position

        const distanceToExit = exitpos.distanceTo(playerpos)
        if (distanceToExit < 60) {
            this.beenDoneExited = true
            messageComp.showMessage("You exit the room")
            }
        }
    }
}
