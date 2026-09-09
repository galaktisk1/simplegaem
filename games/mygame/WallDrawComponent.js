class WallDrawComponent extends Component {

    draw(ctx) {
        let position = this.gameObject.transform.position
        ctx.save()
        ctx.fillStyle = "#4d4d4d"
        ctx.translate(position.x, position.y)
        ctx.rotate(this.gameObject.transform.rotation)
        ctx.beginPath()
        // rectangle
        let scale = this.gameObject.transform.scale
        ctx.lineTo(0, 0)
        ctx.lineTo(250 * scale.x, 0)
        ctx.lineTo(250 * scale.x, 80 * scale.y)
        ctx.lineTo(0, 80 * scale.y)
        ctx.fill()

        ctx.restore()
    }
}