class Polygon extends Component {
    points = []
    fillstyle = "magenta"
    strokestyle = "transparent"
    linewidth = 5

    draw(ctx) {
        ctx.save()
        const position = this.transform.position
        ctx.translate(position.x, position.y)

        ctx.beginPath()
        for (const point of this.points) {
            ctx.lineTo(point.x, point.y)
        }
        ctx.closePath()

        ctx.fillStyle = this.fillstyle
        ctx.fill()

        ctx.strokeStyle = this.strokestyle
        ctx.lineWidth = this.linewidth
        ctx.stroke()

        ctx.restore()
    }
}
