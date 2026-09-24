class MessageComponent extends Component {
    start() {
        // handler for persisting the messages in the scene
        const scene = SceneManager.currentScene
        for (const message of Globals.messages) {
            if (!scene.gameObjects.includes(message.gameObject)) {
                scene.instantiate(message.gameObject)
            }
        }
    }

    showMessage(msg, lifetime = 3) {
        const currentScene = SceneManager.currentScene
        const currentmsg = currentScene.instantiate(new TestTextGameObject())
        const txtlabel = currentmsg.getComponent(TextLabel)
        txtlabel.text = msg

        Globals.messages.push({ gameObject: currentmsg, lifetime: lifetime })
    }

    update() {
        const messageObj = this.gameObject
        for (const message of Globals.messages) {
            message.lifetime -= Time.deltaTime

            if (message.lifetime <= 0) {
                message.gameObject.destroy()
            }
        }

        Globals.messages = Globals.messages.filter(message => message.lifetime > 0)

        for (let i = 0; i < Globals.messages.length; i++) {
            const message = Globals.messages[i].gameObject
            const msgpos = message.transform.position
            const objpos = messageObj.transform.position
            const spacing = 24

            msgpos.x = objpos.x
            msgpos.y = objpos.y + i * spacing
        }
    }
}
