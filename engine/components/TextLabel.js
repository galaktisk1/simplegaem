class TextLabel extends Component {
    fillStyle = "black"
    text = "[BLANK]"

    
    draw(ctx) {
        const transform = this.transform
        ctx.save()
        const position = transform.position

        ctx.translate(position.x, position.y)
        ctx.scale(transform.scale.x, transform.scale.y)
        ctx.rotate(transform.rotation)

        ctx.fillStyle = this.fillStyle
        ctx.fillText(this.text, 0, 0)

        ctx.restore()

    }


}