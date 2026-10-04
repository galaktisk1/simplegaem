class MessageManager extends Component {
    start() {
        // handler for persisting the messages in the scene
        const scene = SceneManager.currentScene
        for (const message of Globals.messages) {
            if (!scene.gameObjects.includes(message.gameObject)) {
                scene.instantiate(message.gameObject)
            }
        }
    }

    showMessage(msg, lifetime) {
        const message = SceneManager.currentScene.instantiate(new MessageGameObject())
            .getComponent(MessageComponent)
        message.showMessage(msg, lifetime)
        return message
    }

    update() {
        const messageObj = this.gameObject
        const objpos = messageObj.transform.position
        const spacing = 12
        let y = objpos.y

        Globals.messages = Globals.messages.filter(message => !message.gameObject.markForDestroy)

        for (let i = 0; i < Globals.messages.length; i++) {
            const message = Globals.messages[i].gameObject
            const msgpos = message.transform.position

            y += spacing * (message.transform.scale.y - 1)

            // center the message horizontally
            msgpos.x = Engine.canvas.width / 2
            msgpos.y = y
            y += spacing
        }
    }
}