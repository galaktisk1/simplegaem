class MessageComponent extends Component {
    
    update() {
        const messageGO = this.gameObject
        for (const message of messageGO.message) {
            message.lifetime -= Time.deltaTime
        }

        messageGO.message = messageGO.message.filter(message => message.lifetime > 0)
    }

    draw(ctx) {
        const messageGO = this.gameObject
        const position = messageGO.transform.position
        const fontSize = 20
        const msgMargin = 4
        ctx.save()

        ctx.fillStyle = "white"
        ctx.font = fontSize + "px Arial"
        for (let i = 0; i < messageGO.message.length; i++) {
            const message = messageGO.message[i]
            ctx.fillText(message.text, position.x, position.y + i * (fontSize + msgMargin))
        }
        ctx.restore()
    }
}
