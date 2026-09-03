class Polygon extends Component {
    points = []
    fillstyle
    strokestyle
    linewidth

    draw(ctx) {
        ctx.save()

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