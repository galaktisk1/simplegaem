class MessageComponent extends Component {

    showMessage(msg, lifetime = 3) {
        const currentmsg = this.gameObject
        const txtlabel = currentmsg.getComponent(TextLabel)
        txtlabel.text = msg
        currentmsg.lifetime = lifetime
        Globals.messages.push({ gameObject: currentmsg})
    }

    update() {
        this.gameObject.lifetime -= Time.deltaTime
        if (this.gameObject.lifetime <= 0) {
            this.gameObject.destroy()
        }
    }
}
