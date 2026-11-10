class ExitComponent extends Component {
    beenDoneExited = false

    onTriggerStay(other, mtv) {
        if (this.beenDoneExited || other.name !== "Player") return
        this.beenDoneExited = true
        const msgmanager = GameObject.find("MessageManager")
            .getComponent(MessageManager)
        msgmanager.showMessage("You exit the room", 3)
    }
}
