class MessageComponent extends Component {
    message = []

    showMessage(msg, lifetime = 3) {
        const currentScene = SceneManager.currentScene
        const currentmsg = currentScene.instantiate(new TestTextGameObject())
        const txtlabel = currentmsg.getComponent(TextLabel)
        txtlabel.text = msg

        this.message.push({ gameObject: currentmsg, lifetime: lifetime })
    }

    update() {
        const messageObj = this.gameObject
        for (const message of this.message) {
            message.lifetime -= Time.deltaTime

            if (message.lifetime <= 0) {
                message.gameObject.destroy()
            }
        }

        this.message = this.message.filter(message => message.lifetime > 0)

        for (let i = 0; i < this.message.length; i++) {
            const message = this.message[i].gameObject
            const msgpos = message.transform.position
            const objpos = messageObj.transform.position
            const spacing = 16

            msgpos.x = objpos.x
            msgpos.y = objpos.y + i * spacing
        }
    }
}
