class MessageComponent extends Component {
    
    update() {
        const messageObj = this.gameObject
        for (const message of messageObj.message) {
            message.lifetime -= Time.deltaTime

            if (message.lifetime <= 0) {
                message.gameObject.destroy()
            }
        }

        messageObj.message = messageObj.message.filter(message => message.lifetime > 0)

        for (let i = 0; i < messageObj.message.length; i++) {
            const message = messageObj.message[i].gameObject
            const msgpos = message.transform.position
            const objpos = messageObj.transform.position
            const spacing = 16
            
            msgpos.x = objpos.x
            msgpos.y = objpos.y + i * spacing
        }
    }
}
