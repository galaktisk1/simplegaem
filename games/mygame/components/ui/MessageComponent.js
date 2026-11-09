class MessageComponent extends Component {

    showMessage(msg, lifetime = 3) {
        const currentmsg = this.gameObject
        const txtlabel = currentmsg.getComponent(TextLabel)
        txtlabel.text = msg
        currentmsg.lifetime = lifetime
        Globals.messages.push({ gameObject: currentmsg })
        this.startCoroutine(this.destroyAfterDelay())
    }

    *destroyAfterDelay() {
        yield new WaitForSeconds(this.gameObject.lifetime)
        this.gameObject.destroy()
    }
}
