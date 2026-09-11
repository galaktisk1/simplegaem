class MessageComponent extends Component {
    draw(ctx) {
        const position = this.gameObject.transform.position
        ctx.save()

        ctx.fillStyle = "white"
        ctx.font = "20px Arial"
        ctx.fillText(this.gameObject.message, position.x, position.y)
        ctx.restore()
    }
}