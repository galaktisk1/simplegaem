class WallDrawComponent extends Component {

    draw(ctx) {
        let position = this.gameObject.position
        ctx.save()
        ctx.fillStyle = "#4d4d4d"
        ctx.translate(position.x, position.y)
        ctx.rotate(this.gameObject.rotation)
        ctx.beginPath()
        // rectangle
        ctx.lineTo(0, 0)
        ctx.lineTo(250, 0)
        ctx.lineTo(250, 80)
        ctx.lineTo(0, 80)
        ctx.fill()

        ctx.restore()
    }
}