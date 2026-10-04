class ExitComponent extends Component {
    beenDoneExited = false

    update() {
        if (!this.beenDoneExited) {

        const player = GameObject.find("Player")
        if (!player) return
        const exitpos = this.transform.position
        const playerpos = player.transform.position

        const distanceToExit = exitpos.distanceTo(playerpos)
        if (distanceToExit < 60) {
            this.beenDoneExited = true
            const msgmanager = GameObject.find("MessageManager")
                .getComponent(MessageManager)
            msgmanager.showMessage("You exit the room", 3)
            }
        }
    }
}
